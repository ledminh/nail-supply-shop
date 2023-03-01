import { FunctionComponent } from "react";

import styles from './SingleEdit.module.scss';

import useSingleEdit from "./useSingleEdit";

import Image from 'next/image';
import { _ProductType } from "../../../../../types";

/***************************
 *  Types
 */
interface SingleEditPropsType {
    data: _ProductType
} 

type SingleEditType = FunctionComponent<SingleEditPropsType>



/***************************
 *  Main Component
 */
const SingleEdit:SingleEditType = ({data}) => {

    const {
        productName,
        onProductNameChange,
        images,
        id,
        onIdChange,
        shortDescription,
        onShortDescriptionChange,
        fullDescription,
        onFullDescriptionChange,
        price,
        onPriceChange,
        onSave,
        onCancel
    } = useSingleEdit({data});

    return (
        <div className={styles.wrapper}>
            <input className={styles.name} 
                type="text"
                value={productName}
                onChange={onProductNameChange}
                />
            <div className={styles.images}>
                {
                    images.map((image, index) => (
                        <div key={index} className={styles.image}>
                            <Image
                                src={image.url}
                                alt={image.alt? image.alt: productName}
                                fill
                                sizes="(max-width: 640px) 50vw, (max-width: 768px) 20vw, 10vw"
                                style={{objectFit: 'cover'}}
                                />
                        </div>))
                }                
            </div>
            <form className={styles.text}>
                <label htmlFor="id">ID</label>
                <input 
                    id="id"
                    type="text"
                    value={id}
                    onChange={onIdChange}
                    />
                <label htmlFor="shortDescription">Short Description</label>
                <input 
                    id="shortDescription"
                    type="text"
                    value={shortDescription}
                    onChange={onShortDescriptionChange}
                    />
                <label htmlFor="fullDescription">Full Description</label>
                <input 
                    id="fullDescription"
                    type="text"
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
                    Edit
                </button>
                <button className={styles.button + ' ' + styles.cancel}
                    onClick={onCancel}
                    >Delete</button>
            </div>
        </div>
    )
}

export default SingleEdit;