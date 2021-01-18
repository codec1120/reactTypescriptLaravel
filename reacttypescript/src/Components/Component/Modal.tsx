import React from 'react';

// Initialize Props
interface Props {
    modaClassName?: string,
    modalHeadText?: string,
    children?: JSX.Element | JSX.Element[] | string,
    modalFooter?: JSX.Element,
    isConfirmModal?: boolean,
    onConfirmYes?: () => void,
    onConfirmNo?: () => void,
}

export const Modal: React.FC<Props> =  ({ modaClassName, modalHeadText, children, modalFooter, isConfirmModal, onConfirmYes, onConfirmNo }) => {
    
    return (
        <div className={`modal ${modaClassName}`}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title"> {modalHeadText} </p>
                </header>
                    <section className="modal-card-body">
                        { children }
                    </section>
                <footer className="modal-card-foot">
                    {isConfirmModal ? (
                            <div>
                                <button className="button is-success" onClick={onConfirmYes}>Yes</button>
                                <button className="button is-danger" onClick={onConfirmNo}>No</button>
                            </div>
                        ) 
                        : modalFooter ? modalFooter: (<button className="button">Close</button>)}
                    
                </footer>
            </div>
        </div>
    );
}