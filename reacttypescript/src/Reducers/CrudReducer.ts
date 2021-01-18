import { CRUDACTIONDISPATCHTYPE, FAIL, LOADING, SUBMITSUCESS, UPDATE, REMOVE, SUBMITFAIL, INFO_PAYLOAD, SETARRAYVALUE, SETID, SUCCESSLOAD, UPDATESUCESS, UPDATEFAIL, REMOVESUCESS, REMOVEFAIL } from '../Actions/CrudRootActonTypes';
import produce from 'immer';

export interface DefaultStateI {
    payload?: INFO_PAYLOAD[]
    loading?:boolean,
    message?: string,
    first_name?: string,
    last_name?: string,
    id?: number,
    selectedId?: number
}

export const defaultState: DefaultStateI = {
    loading: true,
    first_name: '',
    last_name: '',
    id: 0,
    selectedId: 0,
    message: ''
}

const CrudReducer =  ( state: DefaultStateI = defaultState, action: CRUDACTIONDISPATCHTYPE ): DefaultStateI  => {
    const newState = { ...state };
    
    switch ( action.type ) {
        case SUCCESSLOAD:
            return {
                ...newState,
                payload: action.payload
            }; 
        case FAIL:
            return {
                ...newState,
                loading: true,
                message: action.message
            };
        case LOADING:
            return {
                ...newState,
                loading: true
            };
        case SUBMITSUCESS: 
            return { ...newState, message: action.message};
        case SUBMITFAIL: 
            return { ...newState, message: action.error_message};
        case UPDATE: 
            return {
                ...newState,
                loading: true,
                message: action.message
            };
        case UPDATESUCESS: 
            return { ...newState, message: action.message};
        case UPDATEFAIL: 
            return { ...newState, message: action.error_message};
        case REMOVE: 
            return {
                ...newState,
                loading: true,
                message: action.message
            };
        case REMOVESUCESS: 
            return { ...newState, message: action.message};
        case REMOVEFAIL: 
            return { ...newState, message: action.error_message};
        case SETARRAYVALUE:
            return { ...newState, first_name: action.data.first_name, last_name: action.data.last_name, id: action.data.id };
        case SETID: 
            return { ...newState, selectedId: action.selectedData.id };
        default:
            return newState;
    }
}

export default CrudReducer;