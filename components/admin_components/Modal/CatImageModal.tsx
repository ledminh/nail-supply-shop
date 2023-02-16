import { FunctionComponent } from "react";

import Modal from "./Modal";
import styles from './CatImageModal.module.scss';


interface CatImageModalProps  {
    show: boolean;
    setShow: (show:boolean) => void;
};

type CatImageModalComponent = FunctionComponent<CatImageModalProps>;


const CatImageModal:CatImageModalComponent = ({show, setShow}) => {
    
    
    return (
        <Modal show={show}
            onClose={() => setShow(false)}
        >
            CatImage Modal
        </Modal>
    )


}


export default CatImageModal;