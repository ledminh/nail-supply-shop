
import { FunctionComponent } from "react";

import useCategory from "./hooks";

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
            <Edit 
                categories={_categories}
                />
        </AdminSection>
    )
}

export default CategoryComponent;