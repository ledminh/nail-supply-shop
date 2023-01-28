import { FunctionComponent } from "react";

import styles from './Categories.module.scss';


import { CategoryType } from '../../../../database';


/***************************
 *  Types
 */
interface CategoriesPropsType {
    categories: CategoryType[];
    selectedCategoryID: string|null;
    handleCategoryChange: (currentCategory:CategoryType|null) => void;
} 

type CategoriesType = FunctionComponent<CategoriesPropsType>



/***************************
 *  Main Component
 */
const Categories:CategoriesType = ({selectedCategoryID, handleCategoryChange, categories}) => {

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

export default Categories;