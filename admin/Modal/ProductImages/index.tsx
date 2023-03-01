import { FunctionComponent } from "react";

import Image from 'next/image';

import Modal from "../Modal";
import styles from './ProductImagesModal.module.scss';
import useProductImagesModal from "./useProductImagesModal";

import CloseIconSVG from '../../../assets/images/close_icon.svg'


interface ProductImagesModalProps  {
};

type ProductImagesModalComponent = FunctionComponent<ProductImagesModalProps>;


const ProductImagesModal:ProductImagesModalComponent = () => {
    
    const {
        shown, 
        onFileChange, 
        images, 
        imageTobeDeleted,
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
                            images.length === 0?
                            <div className={styles.placeholder}>
                                <p>No image.</p> 
                                <p>Click ADD IMAGES to upload.</p>
                            </div>: null
                        }
                        {
                            images.map((image, index) => (
                                <button className={styles.image + (image === imageTobeDeleted? ' ' + styles.toBeDeleted : '')} key={index}
                                    onClick={() => onDelete(image)}
                                >
                                    <div className={styles.imageOverlay}>
                                        <CloseIconSVG
                                            viewBox="0 0 12 12"/>
                                    </div>
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
                                </button>))
                        }
                    </div>
                    <form className={styles.form} encType="multipart/form-data" method="post">
                        {
                            images.length < 5?
                            <>
                                <label className={styles.label} htmlFor="product-images">
                                    ADD IMAGES
                                </label>
                                <input type="file"
                                    name="product-images"
                                    id="product-images"
                                    accept="image/*"
                                    multiple
                                    onChange={onFileChange}
                                    />
                            </>
                            :<span>Max 5 images</span>
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


export default ProductImagesModal;