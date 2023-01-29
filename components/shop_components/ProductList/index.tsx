import { FunctionComponent } from "react";

import styles from './ProductList.module.scss';


import { ProductType } from '../../../database';

import Item from './Item';


/***************************
 *  Types
 */
interface ProductListPropsType {
    products: ProductType[];
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