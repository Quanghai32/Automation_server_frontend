import { ActionReducer, combineReducers } from '@ngrx/store';
import { commonInfo } from '../states/agv.state';
import { AgvActionTypes } from '../actions/agv.action'

const initialCommonState: commonInfo = {
    dept: '',
    block: '',
    fromDate: '',
    toDate: '',
    viewMode: 0,
    agvList: [],
    agvOperationList: []
}

export const commonInfoReducer: ActionReducer<commonInfo> = (state = initialCommonState, action) => {
    console.log(action.type);
    switch (action.type) {
        case AgvActionTypes.CHANGE_DEPT:
            return { ...state, dept: action.payload.dept };
        case AgvActionTypes.CHANGE_BLOCK:
            return { ...state, block: action.payload.block };
        case AgvActionTypes.CHANGE_FROM_DATE:
            return { ...state, fromDate: action.payload.fromDate };
        case AgvActionTypes.CHANGE_TO_DATE:
            return { ...state, toDate: action.payload.toDate };
        case AgvActionTypes.CHANGE_VIEW_MODE:
            return { ...state, viewMode: action.payload.viewMode };
        case AgvActionTypes.GET_AGV_LIST_SUCCESS:
            return { ...state, agvList: action.payload.agvList };
        default:
            return state;
    }
}


