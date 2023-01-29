import { FunctionComponent } from "react";

import styles from './CategoryList.module.scss';


import { CategoryType } from '../../../database';


/***************************
 *  Types
 */
interface CategoryListPropsType {
    categories: CategoryType[];
    selectedCategoryID: string|null;
    handleCategoryChange: (currentCategory:CategoryType|null) => void;
} 

type CategoryListType = FunctionComponent<CategoryListPropsType>



/***************************
 *  Main Component
 */
const CategoryList:CategoryListType = ({selectedCategoryID, handleCategoryChange, categories}) => {

    return (
        <div className={styles.wrapper}>
            <h4 className={styles.title}>CATEGORIES</h4>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <button
                        className={selectedCategoryID === null ? styles.selected : ''}
                        onClick={() => handleCategoryChange(null)}
                    >All</button>
                </li>
                {
                    categories.map((category) => (
                        <li key={category.id} className={styles.item}>
                            <button
                                className={selectedCategoryID === category.id ? styles.selected : ''} 
                                onClick={() => {
                                    handleCategoryChange(category);
                                }}>
                                {category.name}
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default CategoryList;