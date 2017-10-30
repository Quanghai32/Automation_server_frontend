import { Component, Inject, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Http, Jsonp } from '@angular/http';
import { ChartService } from './services/chart.service';
import { IMyDpOptions } from 'mydatepicker';
import { SERVER_ADD } from '../const.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { commonInfo, ViewMode } from './states/agv.state';
import { Agv, Dept } from './states/agv.state';
import { AgvBackendService } from './services/agv-backend.service';
import {AgvAction} from './actions/agv.action'

@Component({
    selector: 'chart-app',
    templateUrl: './agv.component.html',
    styleUrls: ['./agv.component.css'],

})
export class AgvComponent implements OnInit {
    myChart: Chart;

    listAgv: string[];

    listDept: Dept[];
    listBlock: string[];
    selectedDept: string;
    selectedBlock: string;

    commonInfo$: Observable<commonInfo>;

    public myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'dd.mmm.yyyy',
    };

    public fromDateModel: any = { date: { year: 2017, month: 8, day: 8 } };
    public toDateModel: any = { date: { year: 2017, month: 8, day: 8 } };

    fromDate: string;
    toDate: string;

    constructor(
        @Inject('ORIGIN_URL') originUrl: string,
        private store: Store<any>,
        private agvBackendService: AgvBackendService,
        private agvAction:AgvAction
    ) {
        this.commonInfo$ = store.select('commonInfoReducer');
    }

    ngOnInit(): void {
        this.agvBackendService.getDeptList().subscribe(result => {
            this.listDept = result.json() as Dept[];
            this.onSelectDept(0);
            this.onSelectBlock(0);
        });
    }

    onFromDateChanged() {
        this.fromDate = this.fromDateModel.date.year + "-" + this.formatString(this.fromDateModel.date.month) + "-" + this.formatString(this.fromDateModel.date.day);
        this.store.dispatch(this.agvAction.FromDateChanged(this.fromDate))
    }

    onToDateChanged() {
        this.toDate = this.toDateModel.date.year + "-" + this.formatString(this.toDateModel.date.month) + "-" + this.formatString(this.toDateModel.date.day);
        this.store.dispatch(this.agvAction.ToDateChanged(this.toDate))
    }

    onSelectDept(dept) {
        this.listBlock = this.listDept[dept]._block;
        this.selectedDept = this.listDept[dept]._name;
        this.onSelectBlock(0);
        this.store.dispatch(this.agvAction.DeptChanged(this.selectedDept))
    }

    onSelectBlock(block) {
        this.selectedBlock = this.listBlock[block];
        this.getListAgv();
        this.store.dispatch(this.agvAction.BlockChanged(this.selectedBlock))
    }

    formatString(n: number) {
        return n > 9 ? "" + n : "0" + n;
    }

    getListAgv() {
        this.agvBackendService.getAgvList(this.selectedDept, this.selectedBlock, this.fromDate)
    }

    showOperationRate() {
        this.store.dispatch(this.agvAction.ChangeViewMode(ViewMode.Operation));
    }

    showSupplyingDetail() {
        this.store.dispatch(this.agvAction.ChangeViewMode(ViewMode.Detail));
    }
}


