import { FunctionComponent, useContext } from "react";

import Image from 'next/image';

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
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <h4>Category Image</h4>
                </div>
                <div className={styles.body}>
                    <div className={styles.image}>
                        <Image
                            src={'/images/001.jpg'}
                            alt={"placeholder"}
                            fill
                            style={{objectFit: 'cover'}}
                            />
                    </div>
                    <form className={styles.form} encType="multipart/form-data" method="post">
                    <input type="file" 
                        name="cat-image"
                        accept="image/*"
                        />
                    </form>
                    
                </div>
                <div className={styles.buttons}>
                        <button className={styles.button + ' ' + styles.save}
                            onClick={() => {
                                setCatImageShow(false)
                            }}
                        >
                            Save
                        </button>
                        <button className={styles.button + ' ' + styles.cancel}
                            onClick={() => {
                                setCatImageShow(false)
                            }}
                        >Cancel</button>
                    </div>
            </div>
        </Modal>
    )


}


export default CatImageModal;