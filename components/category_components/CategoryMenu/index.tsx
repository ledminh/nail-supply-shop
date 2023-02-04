import { FunctionComponent } from "react";

import styles from './CategoryMenu.module.scss';


import { CategoryType } from '../../../database';


/***************************
 *  Types
 */
interface CategoryMenuPropsType {
    categories: CategoryType[];
    selectedCategoryID: string|null;
    handleCategoryChange: (currentCategory:CategoryType|null) => void;
} 

type CategoryMenuType = FunctionComponent<CategoryMenuPropsType>



/***************************
 *  Main Component
 */
const CategoryMenu:CategoryMenuType = ({selectedCategoryID, handleCategoryChange, categories}) => {

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
                                <p className={styles.name}>{category.name}</p>
                                <p className={styles.description}>{category.description}</p>
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default CategoryMenu;