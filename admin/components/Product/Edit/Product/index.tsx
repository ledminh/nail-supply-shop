import { FunctionComponent } from "react";

import styles from './Product.module.scss';

import useProduct from "./useProduct";

/***************************
 *  Types
 */
interface ProductPropsType {

} 

type ProductType = FunctionComponent<ProductPropsType>



/***************************
 *  Main Component
 */
const Product:ProductType = () => {

    const {} = useProduct({});

    return (
        <div className={styles.wrapper}>
            Product component
        </div>
    )
}

export default Product;