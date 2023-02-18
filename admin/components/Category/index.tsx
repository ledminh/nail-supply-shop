
import { FunctionComponent } from "react";


import Add from './Add';
import Edit from "./Edit";
import AdminSection from "../../../layouts/AdminSection";
import { _CategoryType } from "../../types";

/***************************
 *  Types
 */
interface CategoryPropsType {}; 

type CategoryComponentType = FunctionComponent<CategoryPropsType>


/***************************
 *  Main Component
 */
const CategoryComponent:CategoryComponentType = () => {


    return (
        <AdminSection
            title="Category"
        >   
            <Add />
            <Edit />
        </AdminSection>
    )
}

export default CategoryComponent;