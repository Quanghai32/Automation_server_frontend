import { Injectable } from '@angular/core';
import { Http, Jsonp } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { SERVER_ADD } from '../../const.service';
import { AgvAction } from '../actions/agv.action';

@Injectable()
export class AgvBackendService {
    constructor(private http: Http, private store: Store<any>, private agvAction: AgvAction) { }
    getDeptList(): Observable<any> {
        return this.http.get(SERVER_ADD + '/api/agv/GetDeptList');
    }
    getAgvList(selectedDept, selectedBlock, fromDate) {
        this.http.get(SERVER_ADD + '/api/agv/GetAgvList/' + selectedDept + '/' + selectedBlock + '/' + fromDate)
            .subscribe(result => {
                let listAgv = result.json() as string[];
                this.store.dispatch(this.agvAction.GetAgvList(listAgv));
            });
    }
    getAgvOperationRate() {

    }
    getAgvSupply() {

    }
    getDetailAgvSupply() {

    }
    getDetailAgvSupplyOperation() {

    }

}
