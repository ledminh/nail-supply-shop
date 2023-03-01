import { FunctionComponent } from "react";

import Image from 'next/image';

import Modal from "../Modal";
import styles from './ProductImagesModal.module.scss';
import useProductImagesModal from "./useProductImagesModal";



interface ProductImagesModalProps  {
};

type ProductImagesModalComponent = FunctionComponent<ProductImagesModalProps>;


const ProductImagesModal:ProductImagesModalComponent = () => {
    
    const {
        shown, 
        onFileChange, 
        images, 
        onDelete, 
        onOK,
        onCancel, 
    } = useProductImagesModal();
    
    return (
        <Modal show={shown}>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <h4>Product Images</h4>
                </div>
                <div className={styles.body}>
                    <div className={styles.images}>
                        {
                            images && 
                            images.map((image, index) => (
                                <div className={styles.image} key={index}>
                                    {
                                        (image instanceof File)? 
                                        <Image
                                            src={URL.createObjectURL(image)}
                                            alt={"placeholder"}
                                            fill
                                            style={{objectFit: 'cover'}}
                                            />  
                                        :<Image
                                            src={image.url}
                                            alt={image.alt? image.alt : "product image"}
                                            fill
                                            style={{objectFit: 'cover'}}
                                            />
                                    }
                                </div>))
                        }
                    </div>
                    <form className={styles.form} encType="multipart/form-data" method="post">
                        {/* {
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

                        } */}
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


export default ProductImagesModal;