import { FunctionComponent, useContext } from "react";

import Image from 'next/image';

import Modal from "./Modal";
import styles from './CatImageModal.module.scss';
import useCatImage from "./catImageHook";



interface CatImageModalProps  {
    setFileForm: (file:FormData|null) => void;
};

type CatImageModalComponent = FunctionComponent<CatImageModalProps>;


const CatImageModal:CatImageModalComponent = ({setFileForm}) => {
    
    const {shown, reset, file, imageUrl, onFileChange, onCancel, onSave} = useCatImage({setFileForm});
    
    return (
        <Modal show={shown}>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <h4>Category Image</h4>
                </div>
                <div className={styles.body}>
                    <div className={styles.image}>
                        {
                            imageUrl && <Image
                                src={imageUrl}
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
                                            onClick={reset}
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
                            onClick={onSave}
                        >
                            Save
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