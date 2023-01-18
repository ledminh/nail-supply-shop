import { FunctionComponent } from "react";

import styles from './ProductList.module.scss';


import { ProductSummaryType } from '../../../database';

import Item from './Item';


/***************************
 *  Types
 */
interface ProductListPropsType {
    products: ProductSummaryType[];
} 

type ProductListType = FunctionComponent<ProductListPropsType>



/***************************
 *  Main Component
 */
const ProductList:ProductListType = ({products}) => {

    return (
        <ul className={styles.wrapper}>
        {
            products.map((product) => (
                <li key={product.id}>
                    <Item product={product}/>
                </li>
            ))
        }
        </ul>
    )
}

export default ProductList;