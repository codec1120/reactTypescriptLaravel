import React from 'react';


// Initialize Props
interface Props {
    children:  JSX.Element | JSX.Element[],
    className?: string
}

export const FormControl: React.FC<Props> =  ({ children, className }) => {
    
    return (
        <div className="field">
            <div className={`control ${className}`}>
            { children }
            </div>
        </div>
    );
}
