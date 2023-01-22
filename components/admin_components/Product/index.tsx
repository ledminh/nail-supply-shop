import { FunctionComponent } from "react";
import { CategoryType, ProductType } from "../../../database";

import styles from './Product.module.scss';

import Add from './Add';
import Edit from "./Edit";
import AdminSection from "../../../layouts/AdminSection";

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
        <AdminSection
            title="Product"
            >
            <Add
                categories={categories}
                onClick={(data) => {
                    console.log(data);
                }}
            />
            <Edit 
                products={products}
                />
        </AdminSection>
    )
}

export default ProductComponent;