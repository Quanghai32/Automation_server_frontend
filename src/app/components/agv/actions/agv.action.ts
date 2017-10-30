import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import {ViewMode} from '../states/agv.state'

export const AgvActionTypes = {
    GET_DEPT_STARTED: 'GET_DEPT_STARTED',
    GET_DEPT_SUCCESS: 'GET_DEPT_SUCCESS',
    GET_BLOCK_STARTED: 'GET_BLOCK_STARTED',
    GET_BLOCK_SUCCESS: 'GET_BLOCK_SUCCESS',
    GET_AGV_LIST_STARTED: 'GET_AGV_LIST_STARTED',
    GET_AGV_LIST_SUCCESS: 'GET_AGV_LIST_SUCCESS',
    CHANGE_DEPT: 'CHANGE_DEPT',
    CHANGE_BLOCK: 'CHANGE_BLOCK',
    CHANGE_FROM_DATE: 'CHANGE_FROM_DATE',
    CHANGE_TO_DATE: 'CHANGE_TO_DATE',
    CHANGE_VIEW_MODE: 'CHANGE_VIEW_MODE',
}

@Injectable()
export class AgvAction {
    public GetDept(): Action {
        return {
            type: AgvActionTypes.GET_DEPT_STARTED,
            payload: null
        }
    }
    public GetBlock(): Action {
        return {
            type: AgvActionTypes.GET_BLOCK_STARTED,
            payload: null
        }
    }
    public GetAgvList(agvList: string[]): Action {
        return {
            type: AgvActionTypes.GET_AGV_LIST_SUCCESS,
            payload: { agvList: agvList }
        }
    }
    public FromDateChanged(fromDate:string):Action{
        return {
            type: AgvActionTypes.CHANGE_FROM_DATE,
            payload: { fromDate: fromDate }
        }
    }
    public ToDateChanged(fromDate:string):Action{
        return {
            type: AgvActionTypes.CHANGE_TO_DATE,
            payload: { toDate: fromDate }
        }
    }
    public DeptChanged(dept:string):Action{
        return {
            type: AgvActionTypes.CHANGE_DEPT,
            payload: { dept: dept }
        }
    }
    public BlockChanged(block:string):Action{
        return {
            type: AgvActionTypes.CHANGE_BLOCK,
            payload: { block: block }
        }
    }
    public ChangeViewMode(viewMode:ViewMode):Action{
        return {
            type: AgvActionTypes.CHANGE_VIEW_MODE,
            payload: { viewMode: viewMode }
        }
    }
}