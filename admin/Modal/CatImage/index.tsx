import { FunctionComponent, useContext } from "react";

import Image from 'next/image';

import Modal from "../Modal";
import styles from './CatImageModal.module.scss';
import useCatImageModal from "./useCatImageModal";



interface CatImageModalProps  {
};

type CatImageModalComponent = FunctionComponent<CatImageModalProps>;


const CatImageModal:CatImageModalComponent = () => {
    
    const {
        shown, 
        onFileChange, 
        file, 
        onDelete, 
        onOK,
        onCancel, 
    } = useCatImageModal();
    
    return (
        <Modal show={shown}>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <h4>Category Image</h4>
                </div>
                <div className={styles.body}>
                    <div className={styles.image}>
                        {
                            file && <Image
                                src={URL.createObjectURL(file)}
                                alt={"placeholder"}
                                fill
                                style={{objectFit: 'cover'}}
                                />
                        }
                    </div>
                    <form className={styles.form} encType="multipart/form-data" method="post">
                        {
                            file?
                                (
                                    <>
                                        <span className={styles.filePath}>{file.name}</span>
                                        <button className={styles.cancel}
                                            onClick={onDelete}
                                            >
                                            Delete
                                        </button>    
                                    </>
                                )                  
                                :<input type="file" 
                                    name="cat-image"
                                    accept="image/*"
                                    onChange={onFileChange}
                                    />

                        }

                    </form>                    
                </div>
                <div className={styles.buttons}>
                        <button className={styles.button + ' ' + styles.save}
                            onClick={onOK}
                        >
                            OK
                        </button>
                        <button className={styles.button + ' ' + styles.cancel}
                            onClick={onCancel}
                        >Cancel</button>
                    </div>
            </div>
        </Modal>
    )


}


export default CatImageModal;