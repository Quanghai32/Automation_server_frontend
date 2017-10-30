import { Component, Inject, OnInit, Input } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Http, Jsonp } from '@angular/http';
import { Store } from '@ngrx/store';
import { SERVER_ADD } from '../const.service';
import { Observable } from 'rxjs/Observable';
import { commonInfo } from './states/agv.state'

@Component({
    selector: 'agv-supply',
    templateUrl: './agv-supply.component.html',
    styleUrls: ['./agv.component.css'],
})
export class AgvSupplyComponent implements OnInit {


    detailChart: Object;
    partSupplied: SupplyingDetail[];
    supplyPartName = new Array();
    supplyTime = new Array();
    colorIndex: number = 0;
    colorSupply = new Array();
    colorMatter: string[] = ['red', 'orange', 'CornflowerBlue', 'purple', 'gray', 'black', 'pink', 'BlueViolet', 'DarkKhaki', 'cyan',
        'Tomato', 'DarkSeaGreen', 'SlateGray', 'RosyBrown', 'Olive', 'CornflowerBlue', 'Bisque', 'MediumVioletRed', '', '',
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', ''];

    orgUrl: string;

    dept: string;
    block: string;
    fromDate: string;
    toDate: string;
    myAgvs: string[];

    commonInfo$: Observable<commonInfo>;

    constructor(private http: Http, private store: Store<any>) {
        this.orgUrl = SERVER_ADD;
        this.commonInfo$ = store.select('commonInfoReducer');
        this.commonInfo$.subscribe(value => {
            this.dept = value.dept;
            this.block = value.block;
            this.fromDate = value.fromDate;
            this.toDate = value.toDate;
            this.myAgvs = value.agvList;
        });
    }

    ngOnInit(): void {

    }
    s: string;
    GetSupplyingDetail4Agv(agvId: string) {

        this.s = this.orgUrl + '/api/agv/GetSupplyTime/' + this.dept + '/' + this.block + '/' + this.fromDate + '/' + this.toDate + '/' + agvId;
        this.supplyPartName.length = 0;
        this.supplyTime.length = 0;
        this.colorSupply.length = 0;
        this.colorIndex = 0;
        //http://localhost:64905/api/agv/GetSupplyTime/assy3/d8182/2017-08-08/2017-08-08/agv15
        this.http.get(this.orgUrl + '/api/agv/GetSupplyTime/' + this.dept + '/' + this.block + '/' + this.fromDate + '/' + this.toDate + '/' + agvId)
            .subscribe(result => {
                this.partSupplied = result.json() as SupplyingDetail[];
                for (var i = 0; i < this.partSupplied.length; i++) {
                    this.supplyPartName[i] = this.partSupplied[i].StartTime + ' to ' + this.partSupplied[i].EndTime + ' ' + this.partSupplied[i].Part + '(' + this.partSupplied[i].Route + ')';
                    this.supplyTime[i] = this.partSupplied[i].SupplyTime;

                    if (i > 0) {
                        if (this.partSupplied[i].Route != this.partSupplied[i - 1].Route) {
                            this.colorSupply[i] = this.colorMatter[++this.colorIndex];

                            if (this.colorIndex == 20) this.colorIndex = 0;
                        }
                        else {
                            this.colorSupply[i] = (this.colorMatter[this.colorIndex]);
                        }
                    }
                    else {
                        this.colorSupply[i] = (this.colorMatter[this.colorIndex]);
                    }
                }

                if (this.partSupplied.length == 0) {
                    this.detailChart = new Chart({

                    });
                    return;
                }

                this.detailChart = new Object({
                    chart: {
                        type: 'column',
                    },
                    title: {
                        text: 'Agv detail supplying'
                    },
                    subtitle: {
                        text: agvId + ' supply ' + this.supplyPartName.length.toString() + ' times'
                    },
                    xAxis: {
                        categories: this.supplyPartName,
                    },
                    colors: this.colorSupply,
                    yAxis: {
                        mini: 0,
                        title: {
                            text: 'Time (minutes)'
                        },
                        min: 0,
                        max: 100
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.1f} min</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                    plotOptions: {
                        series: {
                            cursor: 'pointer',
                            point: {
                                events: {
                                    click: function () {
                                        //location.href = 'chart/(test-outlet:detail)';
                                    }
                                }
                            }
                        }
                    },
                    series: [
                        {
                            name: 'supply time',
                            data: this.supplyTime,
                            colorByPoint: true,
                        },
                    ],
                });
            });


    }

    onSelect(agvId) {
        this.GetSupplyingDetail4Agv(agvId);
    }
}

interface SupplyingDetail {
    AgvName: string;
    SupplyTime: number; 
    StartTime: string;
    EndTime: string;
    Route: number;
    Part: string;
}

