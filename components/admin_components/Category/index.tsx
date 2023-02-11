import { FunctionComponent } from "react";
import { CategoryType } from "../../../database";

import useCategory from "./hooks";

import Add from './Add';
import Edit from "./Edit";
import AdminSection from "../../../layouts/AdminSection";

/***************************
 *  Types
 */
interface CategoryPropsType {
    categories: CategoryType[]

} 

type CategoryComponentType = FunctionComponent<CategoryPropsType>


/***************************
 *  Main Component
 */
const CategoryComponent:CategoryComponentType = ({categories}) => {

    const {handleAdd} = useCategory(categories);

    return (
        <AdminSection
            title="Category"
        >   
            <Add 
                onClick={handleAdd}
            />
            <Edit 
                categories={categories}
                />
        </AdminSection>
    )
}

export default CategoryComponent;