import React from 'react';


// Initialize Props
interface Props {
    label: string,
    className?: string
}

export const Label: React.FC<Props> =  ({ label, className }) => {
    
    return (
        <label className={  `label ${ className}` }>{ label }</label>
    );
}
