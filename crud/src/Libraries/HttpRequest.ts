import axios from 'axios';
import env from '../Config/env.config';

// Initialize Method Parameter Types
export interface METHODI {
    url: string
    params?: object
    config?: {
        headers: {
            "Authorization"?: string,
            "Accept"?: string,
            "Content-Type"?: string
        } 
    } 
    DeleteConfig?: object
}

// Methods
const get = async ( methodParams: METHODI ) => {
    const { url, params, config } = methodParams;

    const customConfig: {} = config ? config: {
        "Authorization": env.REACT_APP_HEADER_AUTH,
        "Accept": 'application/json',
        "Content-Type": "multipart/form-data"
    }; 

    return await axios({
                    method: 'get',
                    url: url,
                    headers: customConfig ,
                    responseType: 'json', 
                })
                .then(response => response.data)
                .catch(error => error);
}

const post = async ( methodParams: METHODI ) => {
    const { url, params, config } = methodParams;

    const customConfig: {} = config ? config: {
        "Authorization": env.REACT_APP_HEADER_AUTH,
        "Accept": 'multipart/form-data',
        "Content-Type": "application/json"
    }; 

    return await axios({
                    method: 'post',
                    url: url,
                    data: params,
                    headers: customConfig ,
                }).then(response => response)
                  .catch(error => error);
}

const put = async ( methodParams: METHODI ) => {
    const { url, params, config } = methodParams;

    const customConfig: {} = config ? config: {
        "Authorization": env.REACT_APP_HEADER_AUTH,
        "Accept": 'multipart/form-data',
        "Content-Type": "application/json"
    }; 

    return await axios({
                    method: 'put',
                    url: url,
                    data: params,
                    headers: customConfig ,
                })
                .then(response => response)
                .catch(error => error);
}

const remove = async ( methodParams: METHODI ) => {
    const { url, params , DeleteConfig} = methodParams;

    const customConfig: {} = DeleteConfig ? DeleteConfig: {
        headers: {
            "Authorization": env.REACT_APP_HEADER_AUTH,
            "Accept": 'multipart/form-data',
            "Content-Type": "application/json"
        },
        data: params
    }; 
    
    return await axios({
                    method: 'delete',
                    url: url,
                    ...customConfig,
                })
                .then(response => response)
                .catch(error => error);
}

export {
    get,
    post,
    put,
    remove
}