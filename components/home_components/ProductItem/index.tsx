import { FunctionComponent } from "react";

import styles from './ProductItem.module.scss';

import { ProductType } from '../../../database';

/***************************
 *  Types
 */




interface ProductItemPropsType {
    product: ProductType
} 

type ProductItemType = FunctionComponent<ProductItemPropsType>



/***************************
 *  Main Component
 */
const ProductItem:ProductItemType = ({product}) => {
    
    return (
        <div className={styles.wrapper}>
            <h4 className={styles.name}>{product.name}</h4>
            <span>{product.shortDescription}</span>
        </div>
    )
}

export default ProductItem;