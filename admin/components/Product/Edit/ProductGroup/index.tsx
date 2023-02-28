import { FunctionComponent } from "react";
import Image from "next/image";
import EditScreen from "../EditScreen";

import styles from './ProductGroup.module.scss';

import { _ProductGroupType } from "../../../../types";

import useProductGroup from "./useProductGroup";

/***************************
 *  Types
 */
interface ProductGroupPropsType {
    productGroup: _ProductGroupType
} 

type ProductGroupType = FunctionComponent<ProductGroupPropsType>



/***************************
 *  Main Component
 */
const ProductGroup:ProductGroupType = ({productGroup}) => {

    const {
        editMode,
        setEditMode,
        currentProduct,
        onDelete
    } = useProductGroup({productGroup});


    const content = editMode ? (
        <EditScreen
            data={productGroup}
            setEditMode={setEditMode}
            />
    ) : (
        <>
            <h5 className={styles.name}>{currentProduct.name}</h5>
            <ul className={styles.productList}>
                {
                    productGroup.map((product, index) => (
                        <li key={index} className={styles.product}>
                            <button>{product.variantName}</button>
                        </li>))
                }
            </ul>
            <ul className={styles.images}>
                {
                    currentProduct.images.map((image, index) => (
                        <li key={index} className={styles.image}>
                            <Image
                                src={image.url}
                                alt={image.alt? image.alt : currentProduct.name}
                                fill
                                style={{
                                    objectFit: 'cover'
                                }}
                                sizes="(max-width: 640px) 50vw, (max-width: 768px) 20vw, 10vw"
                                />
                        </li>
                    ))
                }
            </ul>
            <div className={styles.text}>
                <h5 className={styles.label}>ID</h5>
                <p className={styles.content}>{currentProduct.id}</p>
                <h5 className={styles.label}>Variant name</h5>
                <p className={styles.content}>{currentProduct.variantName}</p>
                <h5 className={styles.label}>
                    Short Description
                </h5>
                <p className={styles.content}>{currentProduct.shortDescription}</p>
                <h5 className={styles.label}>
                    Full Description
                </h5>
                <p className={styles.content}>{currentProduct.fullDescription}</p>
                <h5 className={styles.label}>
                    Price
                </h5>
                <p className={styles.content}>${currentProduct.price}</p>
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
        <div className={styles.wrapper}>
            {content}
        </div>
    )
}


 

export default ProductGroup;