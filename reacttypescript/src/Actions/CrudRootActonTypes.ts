export const SUCCESSLOAD = "SUCCESSLOAD"
export const FAIL = "FAIL"
export const LOADING = "LOADING"
export const SUBMIT = "SUBMIT"
export const UPDATE = "UPDATE"
export const REMOVE =  "REMOVE"
export const SETARRAYVALUE =  "SETARRAYVALUE"
export const SETID =  "SETID"
export const SUBMITSUCESS=  "SUBMITSUCESS"
export const SUBMITFAIL=  "SUBMITFAIL"
export const REMOVESUCESS=  "REMOVESUCESS"
export const REMOVEFAIL=  "REMOVEFAIL"
export const UPDATESUCESS=  "UPDATESUCESS"
export const UPDATEFAIL=  "UPDATEFAIL"

// Payload Types
export type CRUDDATA = {
    first_name?: string,
    last_name?: string,
    id?: number
}
export type INFO_PAYLOAD = {
    payload?: CRUDDATA,
    loading?: boolean
}

export type DEFAULT_PAYLOAD = {
    message?: string,
    status?: boolean
}


// Initialize Action Types
export interface SUCCESSLOADI {
    type: typeof SUCCESSLOAD,
    payload: INFO_PAYLOAD[],
    message?: string
}

export interface FAILI {
    type: typeof FAIL
    message?: string
}

export interface LOADINGI {
    type: typeof LOADING
}

export interface SUBMITI {
    type: typeof SUBMIT
    payload: INFO_PAYLOAD[]
    message?: string
}

export interface UPDATEI {
    type: typeof UPDATE
    payload: INFO_PAYLOAD[]
    message?: string
}

export interface REMOVEI {
    type: typeof REMOVE
    payload: INFO_PAYLOAD[]
    message?: string
}

export interface SETARRAYVALUEI {
    type: typeof SETARRAYVALUE
    data: CRUDDATA
}

export interface SETIDI {
    type: typeof SETID
    selectedData: {
        id: number
    }
}

export interface SUBMITSUCESSI {
    type: typeof SUBMITSUCESS,
    message?: string
}

export interface SUBMITFAILI {
    type: typeof SUBMITFAIL,
    error_message?: string
}

export interface UPDATESUCESSI {
    type: typeof UPDATESUCESS,
    message?: string
}

export interface UPDATEFAILI {
    type: typeof UPDATEFAIL,
    error_message?: string
}

export interface REMOVESUCESSI {
    type: typeof REMOVESUCESS,
    message?: string
}

export interface REMOVEFAILI {
    type: typeof REMOVEFAIL,
    error_message?: string
}


export type CRUDACTIONDISPATCHTYPE = SUBMITFAILI | FAILI | SUBMITI | LOADINGI | REMOVEI | UPDATEI 
                                    | SETARRAYVALUEI | SETIDI | SUCCESSLOADI | SUBMITSUCESSI | UPDATESUCESSI
                                    | UPDATEFAILI | REMOVESUCESSI | REMOVEFAILI