import { Component, Inject, OnInit, Input } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Http, Jsonp } from '@angular/http';
import { ChartService } from './services/chart.service';
import { Agv } from './states/agv.state';
import { SERVER_ADD } from '../const.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { commonInfo } from './states/agv.state'


@Component({
    selector: 'agv-operation',
    templateUrl: './operation.component.html',
    styleUrls: ['./agv.component.css'],
})
export class OperationComponent implements OnInit {
    myChart: Object;

    myAgvs: Agv[];
    nameValue = new Array();
    emgValue = new Array();
    safety = new Array();
    stop = new Array();
    outLine = new Array();
    batEmpty = new Array();
    noCart = new Array();
    normal = new Array();
    free = new Array();
    disConnect = new Array();
    shutDown = new Array();
    poleError = new Array();

    orgUrl: string;

    dept: string;
    block: string;
    fromDate: string;
    toDate: string;

    commonInfo$: Observable<commonInfo>;
    options: Object;

    constructor(private store: Store<any>, private http: Http) {
        this.commonInfo$ = store.select('commonInfoReducer');
        this.commonInfo$.subscribe(value => {
            this.dept = value.dept;
            this.block = value.block;
            this.fromDate = value.fromDate;
            this.toDate = value.toDate;
        });

    }

    ngOnInit(): void {

    }

    s: string;
    c: number;


    GetAgvPerformaces() {
        this.s = SERVER_ADD + '/api/agv/getagvoperationrate/' + this.dept + '/' + this.block + '/' + this.fromDate + '/' + this.toDate;
        this.http.get(SERVER_ADD + '/api/agv/getagvoperationrate/' + this.dept + '/' + this.block + '/' + this.fromDate + '/' + this.toDate)
            .subscribe(result => {
                this.myAgvs = result.json() as Agv[];
                for (var i = 0; i < this.myAgvs.length; i++) {
                    this.nameValue.length = 0;
                    this.emgValue.length = 0;
                    this.safety.length = 0;
                    this.stop.length = 0;
                    this.outLine.length = 0;
                    this.batEmpty.length = 0;
                    this.noCart.length = 0;
                    this.normal.length = 0;
                    this.free.length = 0;
                    this.disConnect.length = 0;
                    this.shutDown.length = 0;
                    this.poleError.length = 0;
                }

                for (var i = 0; i < this.myAgvs.length; i++) {
                    this.nameValue[i] = this.myAgvs[i].Name;
                    this.emgValue[i] = this.myAgvs[i].Emergency;
                    this.safety[i] = this.myAgvs[i].Safety;
                    this.stop[i] = this.myAgvs[i].Stop;
                    this.outLine[i] = this.myAgvs[i].OutLine;
                    this.batEmpty[i] = this.myAgvs[i].BatteryEmpty;
                    this.noCart[i] = this.myAgvs[i].NoCart;
                    this.normal[i] = this.myAgvs[i].Normal;
                    this.free[i] = this.myAgvs[i].Free;
                    this.disConnect[i] = this.myAgvs[i].Disconnect;
                    this.shutDown[i] = this.myAgvs[i].Shutdown;
                    this.poleError[i] = this.myAgvs[i].PoleError;
                }

                if (this.myAgvs.length == 0) {
                    this.myChart = {}
                    return;
                }

                this.createChart();

            });
    }

    createChart(){
        this.myChart = {
            chart: {
                type: 'column',
            },
            title: {
                text: 'Agv data visualize'
            },
            subtitle: {
                text: 'Assy 2 Thang Long fatory'
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                }
            },
            xAxis: {
                categories: this.nameValue,
                color: 'red'
            },
            yAxis: {
                mini: 0,
                title: {
                    text: 'Time (minutes)'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold'

                    }
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            series: [
                {
                    name: 'Disconnect',
                    data: this.disConnect,
                    color: 'gray',
                    allowPointSelect: true
                },
                {
                    name: 'Normal',
                    data: this.normal,
                    color: '#009933',
                    allowPointSelect: true
                },
                {
                    name: 'Free',
                    data: this.free,
                    allowPointSelect: true
                },
                {
                    name: 'Emg',
                    data: this.emgValue,
                    color: 'red',
                    allowPointSelect: true
                },
                {
                    name: 'Safety',
                    data: this.safety,
                    color: '#ff9933',
                    allowPointSelect: true
                },
                {
                    name: 'Stop',
                    data: this.stop,
                    color: 'yellow',
                    allowPointSelect: true
                },
                {
                    name: 'OutLine',
                    data: this.outLine,
                    allowPointSelect: true
                },
                {
                    name: 'Battery empty',
                    data: this.batEmpty,
                    color: '#801a00',
                    allowPointSelect: true
                },
                {
                    name: 'No cart',
                    data: this.noCart,
                    allowPointSelect: true
                },
                {
                    name: 'Shutdown',
                    data: this.shutDown,
                    color: 'black',
                    allowPointSelect: true
                },
                {
                    name: 'Pole error',
                    data: this.poleError,
                    color: 'pink',
                    allowPointSelect: true
                },
            ],
        };
    }
    onPointSelect(point) {
        console.log(point.context.index);
    }
}