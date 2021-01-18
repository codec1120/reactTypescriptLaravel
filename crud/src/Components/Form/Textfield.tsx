import React from 'react';


// Initialize Props
interface Props {
    placeholder?: string,
    id: string,
    className?: string,
    onChangeEvent?: ( params?: any) => void,
    value?:any,
    type?:string,
    readonly?: boolean
}

export const TextField: React.FC<Props> =  ({ placeholder, id, className, onChangeEvent, value, type, readonly}) => {
    
    return (
        <div className="field">
            <input 
                className={ `input ${ className }` } 
                id={ id } 
                type={`${type ? type: "text"}`} 
                placeholder={ placeholder }
                onChange={onChangeEvent} 
                value={value}
                readOnly={readonly}
            />
        </div>
    );
}
