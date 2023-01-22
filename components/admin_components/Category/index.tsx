import { FunctionComponent } from "react";
import { CategoryType } from "../../../database";

import styles from './Category.module.scss';

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

    return (
        <AdminSection
            title="Category"
        >   
            <Add 
                onClick={(data) => {
                    console.log(data);
                }}
            />
            <Edit 
                categories={categories}
                />
        </AdminSection>
    )
}

export default CategoryComponent;