import { FunctionComponent } from "react";
import { CategoryType, ProductGroupType, ProductType } from "../../../database";

import Add from './Add';
import Edit from "./Edit";
import AdminSection from "../../../layouts/AdminSection";

/***************************
 *  Types
 */
interface ProductPropsType {} 

type ProductComponentType = FunctionComponent<ProductPropsType>



/***************************
 *  Main Component
 */
const ProductComponent:ProductComponentType = () => {

    return (
        <AdminSection
            title="Product"
            >
            <Add />
            <Edit />
        </AdminSection>
    )
}

export default ProductComponent;