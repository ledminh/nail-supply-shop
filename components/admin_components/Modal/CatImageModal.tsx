import { FunctionComponent, useContext } from "react";

import Image from 'next/image';

import Modal from "./Modal";
import styles from './CatImageModal.module.scss';
import useCatImage from "./catImageHook";



interface CatImageModalProps  {

};

type CatImageModalComponent = FunctionComponent<CatImageModalProps>;


const CatImageModal:CatImageModalComponent = ({}) => {
    
    const {shown, setShown, reset, fileName, imageUrl, handleOnFileChange} = useCatImage();
    
    return (
        <Modal show={shown}
            onClose={() => {}}
        >
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
                            imageUrl?
                                (
                                    <>
                                        <span className={styles.filePath}>{fileName}</span>
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
                                    onChange={handleOnFileChange}
                                    />

                        }

                    </form>                    
                </div>
                <div className={styles.buttons}>
                        <button className={styles.button + ' ' + styles.save}
                            onClick={() => {
                                setShown(false)
                            }}
                        >
                            Save
                        </button>
                        <button className={styles.button + ' ' + styles.cancel}
                            onClick={() => {
                                setShown(false)
                            }}
                        >Cancel</button>
                    </div>
            </div>
        </Modal>
    )


}


export default CatImageModal;