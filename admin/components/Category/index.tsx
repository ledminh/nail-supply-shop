
import { FunctionComponent } from "react";

import useCategory from "./hooks";

import Add from './Add';
import Edit from "./Edit";
import AdminSection from "../../../layouts/AdminSection";
import { _CategoryType } from "./types";

/***************************
 *  Types
 */
interface CategoryPropsType {
    categories: _CategoryType[]

} 

type CategoryComponentType = FunctionComponent<CategoryPropsType>


/***************************
 *  Main Component
 */
const CategoryComponent:CategoryComponentType = ({categories}) => {

    const {handleAdd, _categories} = useCategory(categories);

    return (
        <AdminSection
            title="Category"
        >   
            <Add 
                handleAdd={handleAdd}
            />
            <Edit 
                categories={_categories}
                />
        </AdminSection>
    )
}

export default CategoryComponent;