import React from 'react';
import map  from 'lodash/map';

// Initialize Table
interface Props {
    data?: object ,
    className?: string,
    THeadcolumns: object,
    data_index?: object,
    enableActionEdit?: boolean,
    enableActionDelete?: boolean,
    columnActionEditClick?: ( event: any ) => void,
    columnActionDeleteClick?: ( event: any ) => void,
}

// Initialize THead
interface Column {
    THeadcolumns: object,
    enableActionEdit?: boolean,
    enableActionDelete?: boolean
}

// THead
export const THead: React.FC<Column> = ({ THeadcolumns, enableActionEdit, enableActionDelete }) => {
 
    return (
        <thead>
            <tr key={-1}>
                { map(THeadcolumns , ( column, index ) => (<th key={index}> { column } </th>) ) }
                { enableActionEdit || enableActionDelete ? (<th>Action</th>): '' }
            </tr>
        </thead>
    );
}

// TBody
export const TBody: React.FC<Props> = ({ data, data_index, enableActionEdit, enableActionDelete, columnActionEditClick, columnActionDeleteClick }) => {
    return(
        <tbody>
            { data? map(data, (rowIndexData, key) => (
                <tr key={key}> 
                    { map(data_index, (dataKey, index) => (<td key={index}> {rowIndexData[dataKey]} </td>) ) } 
                    <td key={key}>
                     { enableActionEdit ? ( <span className="icon actionColumn has-text-success" onClick={columnActionEditClick}><i className="fa fa-check-square"></i></span> ): ""}
                     { enableActionDelete ? ( <span className="icon actionColumn has-text-success" onClick={columnActionDeleteClick}><i className="fa fa-times"></i></span> ): ""}
                    </td>
                </tr>
                ) ): (<td colSpan={3}>No Data Found.</td>)}
        </tbody>
    );
}

export const Table: React.FC<Props> =  ({ className, THeadcolumns, data, data_index, enableActionEdit, enableActionDelete, columnActionEditClick, columnActionDeleteClick }) => {
    
    return (
        <div className="table-container">
            <table className={ `table ${className} is-fullwidth` }>
                <THead THeadcolumns={THeadcolumns} 
                    enableActionEdit={enableActionEdit} 
                    enableActionDelete={enableActionDelete}/>
                <TBody THeadcolumns={THeadcolumns} 
                    data={data} 
                    data_index={data_index} 
                    enableActionEdit={enableActionEdit} 
                    enableActionDelete={enableActionDelete} 
                    columnActionEditClick={columnActionEditClick} 
                    columnActionDeleteClick={columnActionDeleteClick}
                />
            </table>
        </div>
    );
}
