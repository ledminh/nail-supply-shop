import { FunctionComponent } from "react";

import styles from './CategoryItem.module.scss';

import { CategoryType } from '../../../database';


/***************************
 *  Types
 */
interface CategoryItemPropsType {
    category: CategoryType;
} 

type CategoryItemType = FunctionComponent<CategoryItemPropsType>



/***************************
 *  Main Component
 */
const CategoryItem:CategoryItemType = ({category}) => {

    return (
        <div className={styles.wrapper}>
            <h3>{category.name}</h3>
            <p>{category.description}</p>
        </div>
    )
}

export default CategoryItem;