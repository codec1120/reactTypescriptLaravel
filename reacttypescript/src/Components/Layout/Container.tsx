import React from 'react';


// Initialize Props
interface Props {
    children?: JSX.Element | JSX.Element[];
    className?: string
}

export const Container: React.FC<Props> =  ({ children, className }) => {
    
    return (
        <div className="field">
            <div className={ `container ${className}` }>
                { children }
            </div>
        </div>
    );
}
