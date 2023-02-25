import { FunctionComponent } from "react";

import styles from './Product.module.scss';
import { _ProductType } from "../../../../types";

import useProduct from "./useProduct";

import Image from 'next/image';
import EditScreen from "../EditScreen";

/***************************
 *  Types
 */
interface ProductPropsType {
    product: _ProductType
} 

type ProductType = FunctionComponent<ProductPropsType>



/***************************
 *  Main Component
 */
const Product:ProductType = ({product}) => {

    const {
        editMode, 
        setEditMode,
        onDelete
    } = useProduct({product});


    const content = editMode ? (
        <EditScreen
            data={product}
            setEditMode={setEditMode}
            />
    ) : (
        <>
            <h5 className={styles.name}>{product.name}</h5>
            <div className={styles.images}>
                {
                    product.images.map((image, index) => (
                        <div key={index} className={styles.image}>
                            <Image
                                src={image.url}
                                alt={image.alt? image.alt: product.name}
                                fill
                                sizes="(max-width: 640px) 50vw, (max-width: 768px) 20vw, 10vw"
                                style={{objectFit: 'cover'}}
                                />
                        </div>))
                }                
            </div>
            <div className={styles.text}>
                <h5 className={styles.label}>
                    Short Description
                </h5>
                <p className={styles.content}>{product.shortDescription}</p>
                <h5 className={styles.label}>
                    Full Description
                </h5>
                <p className={styles.content}>{product.fullDescription}</p>
                <h5 className={styles.label}>
                    Price
                </h5>
                <p className={styles.content}>${product.price}</p>
            </div>
            <div className={styles.buttons}>
                <button className={styles.button + ' ' + styles.edit}
                    onClick={() => setEditMode(true)}
                >
                    Edit
                </button>
                <button className={styles.button + ' ' + styles.delete}
                    onClick={onDelete}
                    >Delete</button>
            </div>
        </>
    )


    return (
        <div className={styles.wrapper + (product.new? ' ' + styles.new: '') + (product.newest? ' ' + styles.newest: '') + (product.toBeDeleted? ' ' + styles.toBeDeleted: '' )}>
            {content}            
        </div>
    )
}

export default Product;