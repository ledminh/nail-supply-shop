import React, {  useEffect, useState, FunctionComponent } from "react";
import { createPortal } from "react-dom";

import styles from './Modal.module.scss';

export type ModalComponent = FunctionComponent<{show:boolean, onClose?: () => void, children:React.ReactNode}>;

const Modal:ModalComponent = ({ show, onClose, children }) => {
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        setIsBrowser(true);
    }, []);


    const modalContent = show ? (
        <div className={styles.modalOverlay}
                onClick={onClose !== undefined? onClose : () => {}}
            >
            <div className={styles.modal}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className={styles.modalBody}>{children}</div>
            </div>
        </div>
    ) : null;
    
    
    if (isBrowser) {

        const modalRoot = document.querySelector(".modal-root");
        
        if(modalRoot)
            return createPortal(
                modalContent,
                modalRoot
            );
        else
            return null;
        
    } else {
        return null;
    }
};

export default Modal;