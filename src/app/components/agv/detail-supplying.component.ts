import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { Http, Jsonp } from '@angular/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { SERVER_ADD } from '../const.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { commonInfo } from './states/agv.state'



@Component({
    selector: 'detail-supply',
    templateUrl: './detail-supplying.component.html',
    styleUrls: ['./agv.component.css'],
})
export class DetailSupplyingComponent implements OnInit {
    orgUrl: string;
    detailSupply: object[];
    recordSupply: object[];
    recordText: string;

    dept: string;
    block: string;
    fromDate: string;
    toDate: string;
    myAgvs: string[];
    startTime: string='11:12:30';

    selectedAgv: string;
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

    ngOnInit() {
    }
    c: string;
    getDetailSupply(selectedAgv: string) {
        this.c = this.orgUrl + '/api/agv/GetAgvSupplyOperation/' + this.fromDate + '/' + this.dept + '/' + this.block + '/' + selectedAgv + '/' + this.startTime;
        this.http.get(this.orgUrl + '/api/agv/GetAgvSupplyOperation/' + this.fromDate + '/' + this.dept + '/' + this.block + '/' + selectedAgv + '/' + this.startTime)
            .subscribe(result => {
                this.detailSupply = result.json() as detailSupply[];
                console.log(this.detailSupply);
            });
    }

    onSelect(agv: string) {
        this.getDetailSupply(agv);
    }

    getDetailStatus(id,stt:string) {//date_dept_block_agv_startTime_status
        
        this.http.get(this.orgUrl + '/api/agv/GetAgvSupplyDetail/' + this.fromDate + '/' + this.dept + '/' +
            this.block + '/' + id + '/' + this.startTime + '/'+ stt)
            .subscribe(result => {
                this.recordSupply = result.json() as object[];
            });
    }
}

class detailSupply {
    agvName: string;
    supplyTime: string;
    NORMAl: string;
    STOP_BY_CARD: string;
    SAFETY: string;
    BATTERY_EMPTY: string;
    EMERGENCY: string;
    NO_CART: string;
    POLE_ERROR: string;
    OUT_OF_LINE: string;
}