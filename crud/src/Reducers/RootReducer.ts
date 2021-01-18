import { combineReducers } from 'redux';
import CrudReducer from './CrudReducer';

const RootReducer = combineReducers ({
    payload: CrudReducer
});

export default RootReducer