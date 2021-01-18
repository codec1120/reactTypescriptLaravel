import { Dispatch } from 'redux';
import  { CRUDACTIONDISPATCHTYPE,  SUBMITFAIL, LOADING, FAIL, SUCCESSLOAD, SUBMITSUCESS, UPDATESUCESS, UPDATEFAIL, REMOVESUCESS, REMOVEFAIL } from './CrudRootActonTypes';
import { get, post, put, remove, METHODI } from '../Libraries/HttpRequest';  
import env from '../Config/env.config';

// SET OF ACTIONS

const GetInfo = ( params?: string, filtered?: string ) => async ( dispatch: Dispatch<CRUDACTIONDISPATCHTYPE> ) => {
    try {
        // Dispatch Loading 
        dispatch({
            type: LOADING,
            loading: true
        });
       
        // Call Http Request
        const GetMethod: METHODI = {
            url: `${env.REACT_APP_API}GetInfoList?${filtered? `whereValue=${params}&whereColumn=${filtered}`: ''}`
        }

        const res = await get( GetMethod );
        
        dispatch({ 
            type: SUCCESSLOAD,
            payload: res.data,
            loading: false
        });

    } catch (error) {
        dispatch({ 
            type: FAIL,
            message: error.message
        });
    }
} 


const CreateInfo = ( info: object ) => async ( dispatch: Dispatch<CRUDACTIONDISPATCHTYPE> ) => {
    try {
        // Call Http Request
        const PostMethod: METHODI = {
            url: `${env.REACT_APP_API}CreateNewInfoRecord`,
            params: {
                data: info
            }    
        }

        const res = await post( PostMethod );
        
        dispatch({ 
            type: SUBMITSUCESS,
            payload: res.data,
            message: res.data.message
        });

    } catch (error) {
        dispatch({ 
            type: SUBMITFAIL,
            error_message: error.message
        });
    }
} 

const UpdateInfo = ( infoToUpdate: object, id: number ) => async ( dispatch: Dispatch<CRUDACTIONDISPATCHTYPE> ) => {
    try {
        // Dispatch Loading 
        dispatch({
            type: LOADING
        });

        // Call Http Request
        const PutMethod: METHODI = {
            url: `${env.REACT_APP_API}UpdateInfoRecord`,
            params: { data: {
                infoToUpdate,
                id: id
            } }    
        }

        const res = await put( PutMethod );
        
        dispatch({ 
            type: UPDATESUCESS,
            payload: res.data,
            message: res.data.message
        });

    } catch (error) {
        dispatch({ 
            type: UPDATEFAIL,
            message: error.message
        });
    }
}

const RemoveInfo = ( userId: number ) => async ( dispatch: Dispatch<CRUDACTIONDISPATCHTYPE> ) => {
    try {
        // Dispatch Loading 
        dispatch({
            type: LOADING
        });
        // Call Http Request
        const removeMethod: METHODI = {
            url: `${env.REACT_APP_API}RemoveInfoRecord`,
            params: { data: { id: userId } }    
        }

        const res = await remove( removeMethod );
        
        dispatch({ 
            type: REMOVESUCESS,
            payload: res.data,
            message: res.data.message
        });

    } catch (error) {
        dispatch({ 
            type: REMOVEFAIL,
            message: error.message
        });
    }
}




export { GetInfo, CreateInfo, UpdateInfo, RemoveInfo };