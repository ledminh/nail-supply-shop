import { FunctionComponent } from "react";
import { CategoryType, ProductType } from "../../../database";

import styles from './Product.module.scss';

import Add from './Add';
import Edit from "./Edit";

/***************************
 *  Types
 */
interface ProductPropsType {
    categories: CategoryType[],
    products: ProductType[]

} 

type ProductComponentType = FunctionComponent<ProductPropsType>



/***************************
 *  Main Component
 */
const ProductComponent:ProductComponentType = ({categories, products}) => {

    return (
        <div className={styles.wrapper}>
            <h3 className={styles.title}>Product</h3>
            <Add
                categories={categories}
                onClick={(data) => {
                    console.log(data);
                }}
            />
            <Edit 
                products={products}
                />
        </div>
    )
}

export default ProductComponent;