import { FunctionComponent, useContext } from "react";

import Modal from "./Modal";
import styles from './CatImageModal.module.scss';
import ModalContext from './../Context/ModalContext';


interface CatImageModalProps  {

};

type CatImageModalComponent = FunctionComponent<CatImageModalProps>;


const CatImageModal:CatImageModalComponent = ({}) => {
    
    const {isCatImageShown, setCatImageShow} = useContext(ModalContext);
    
    return (
        <Modal show={isCatImageShown}
            onClose={() => setCatImageShow(false)}
        >
            CatImage Modal
        </Modal>
    )


}


export default CatImageModal;