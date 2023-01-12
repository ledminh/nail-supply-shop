import { FunctionComponent } from "react";

import Modal from "./Modal";
import styles from './TemplatNameModal.module.scss';


interface TemplateNameModalProps  {
    show: boolean;
    setShow: (show:boolean) => void;
};

type TemplateNameModalComponent = FunctionComponent<TemplateNameModalProps>;


const TemplateNameModal:TemplateNameModalComponent = ({show, setShow}) => {
    
    
    return (
        <Modal show={show}
            onClose={() => setShow(false)}
        >
            TemplateName Modal
        </Modal>
    )


}


export default TemplateNameModal;