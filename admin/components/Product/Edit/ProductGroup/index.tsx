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
                                />
                        </li>
                    ))
                }
            </ul>
            <div className={styles.infos}>
                <div className="label">Variant name</div>
                <div className="value">{currentProduct.variantName}</div>
                <div className="label">ID</div>
                <div className="value">{currentProduct.id}</div>
                <div className="label">Short Description</div>
                <div className="value">{currentProduct.shortDescription}</div>
                <div className="label">Full Description</div>
                <div className="value">{currentProduct.fullDescription}</div>
                <div className="label">Price</div>
                <div className="value">{currentProduct.price}</div>
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