import { ActionReducer, combineReducers } from '@ngrx/store';
import { commonInfoReducer } from './components/agv/reducers/agv.reducer';

const counterReducer: ActionReducer<any> = (state: number = 0, action) => {
    switch (action.type) {
        case 'INCREASE':
            return state = state + 1;
        case 'INCREASE':
            return state = state - 1;
        default:
            return state;
    }
}
export const appReducer = {
    counterReducer,
    commonInfoReducer
}