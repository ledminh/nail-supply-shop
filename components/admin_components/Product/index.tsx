import { FunctionComponent } from "react";

import styles from './Product.module.scss';

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

    return (
        <div className={styles.wrapper}>
            Product component
        </div>
    )
}

export default Product;