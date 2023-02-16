import { FunctionComponent } from "react";

import styles from './ProductItem.module.scss';

import { ProductType } from '../../../database';


/***************************
 *  Types
 */
interface ProductItemPropsType {
    product: ProductType;
} 

type ProductItemType = FunctionComponent<ProductItemPropsType>



/***************************
 *  Main Component
 */
const ProductItem:ProductItemType = ({product}) => {



 
    return (
        <div className={styles.wrapper}>
            <h4>{product.name}</h4>
            <p>{product.shortDescription}</p>
            <div className={styles.price}>
                <span>Price: </span>
                <span>${product.price}</span>
            </div>
        </div>
    )
}

export default ProductItem;