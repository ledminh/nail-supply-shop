import { FunctionComponent } from "react";

import styles from './SingleEdit.module.scss';

import useSingleEdit from "./useSingleEdit";

import Image from 'next/image';
import { _ProductType } from "../../../../../types";

/***************************
 *  Types
 */
interface SingleEditPropsType {
    data: _ProductType;
    setEditMode: (editMode: boolean) => void;
} 

type SingleEditType = FunctionComponent<SingleEditPropsType>



/***************************
 *  Main Component
 */
const SingleEdit:SingleEditType = ({data, setEditMode}) => {

    const {
        productName,
        onProductNameChange,
        images,
        shortDescription,
        onShortDescriptionChange,
        fullDescription,
        onFullDescriptionChange,
        price,
        onPriceChange,
        onEditImages,
        onSave,
        onCancel
    } = useSingleEdit({data, setEditMode});

    return (
        <div className={styles.wrapper}>
            <input className={styles.name} 
                type="text"
                value={productName}
                onChange={onProductNameChange}
                />
            <div className={styles.images}>
                {
                    images.length === 0?
                    <div className={styles.placeholder}>
                        <p>No image.</p>
                        <p>Click EDIT IMAGES to upload.</p>
                    </div>: null
                }
                {
                    images.map((image, index) => (
                        <div key={index} className={styles.image}>
                            {
                                image instanceof File?
                                <Image
                                    src={URL.createObjectURL(image)}
                                    alt={image.name}
                                    fill
                                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 20vw, 10vw"
                                    style={{objectFit: 'cover'}}
                                    />:
                                    <Image
                                        src={image.url}
                                        alt={image.alt? image.alt: productName}
                                        fill
                                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 20vw, 10vw"
                                        style={{objectFit: 'cover'}}
                                        />

                            }
                            
                        </div>))
                }
                <button className={styles.editImages}
                    onClick={onEditImages}
                >
                    Edit Images
                </button>                
            </div>
            <form className={styles.text}>
                <label htmlFor="shortDescription">Short Description</label>
                <input 
                    id="shortDescription"
                    type="text"
                    value={shortDescription}
                    onChange={onShortDescriptionChange}
                    />
                <label htmlFor="fullDescription">Full Description</label>
                <textarea 
                    id="fullDescription"
                    value={fullDescription}
                    onChange={onFullDescriptionChange}
                    />
                <label htmlFor="price">Price</label>
                <input
                    id="price"
                    type="number"
                    value={price}
                    onChange={onPriceChange}
                    min="0"
                    />
            </form>
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
    )
}

export default SingleEdit;