import { FunctionComponent } from "react";
import { CategoryType } from "../../../database";

import styles from './Category.module.scss';

import Add from './Add';
import Edit from "./Edit";

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
        <div className={styles.wrapper}>
            <h3 className={styles.title}>Category</h3>
            <Add 
                onClick={(data) => {
                    console.log(data);
                }}
            />
            <Edit 
                categories={categories}
                />
        </div>
    )
}

export default CategoryComponent;