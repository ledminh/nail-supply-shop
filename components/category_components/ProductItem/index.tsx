import { FunctionComponent } from "react";

import styles from './ItemBody.module.scss';

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
        <>
            <h4>{product.name}</h4>
            <p>{product.shortDescription}</p>
            <div className={styles.price}>
                <span>Price: </span>
                <span>${product.price}</span>
            </div>
        </>
    )
}

export default ProductItem;