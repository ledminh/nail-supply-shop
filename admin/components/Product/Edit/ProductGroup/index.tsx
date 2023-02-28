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
        </>
    )

    return (
        <div className={styles.wrapper}>
            {content}
        </div>
    )
}


 

export default ProductGroup;