import React from 'react';


// Initialize Props
interface Props {
    onClick?: () => void,
    className?: string,
    ButtonLabel: string
}

export const Button: React.FC<Props> =  ({ onClick, className, ButtonLabel }) => {
    
    return (
        <div className="field">
           <button className={ `button ${className}` } onClick={ onClick }>{ ButtonLabel }</button>
        </div>
    );
}
