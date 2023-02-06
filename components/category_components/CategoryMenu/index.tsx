import { FunctionComponent } from "react";

import styles from './CategoryMenu.module.scss';


import { CategoryType } from '../../../database';
import { handleCategoryChangeParam } from "../../../utils/category_page/hooks";



/***************************
 *  Types
 */
interface CategoryMenuPropsType {
    categories: CategoryType[];
    selectedCategoryID: string|null;
    onChange: (destCat: handleCategoryChangeParam) => void;
} 

type CategoryMenuType = FunctionComponent<CategoryMenuPropsType>



/***************************
 *  Main Component
 */
const CategoryMenu:CategoryMenuType = ({selectedCategoryID, categories, onChange}) => {

    const handleClick = (category: CategoryType|null) => {
        onChange(category);
    }

    return (
        <div className={styles.wrapper}>
            <h4 className={styles.title}>CATEGORIES</h4>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <button
                        className={`${styles.link}${selectedCategoryID === null ? ' ' + styles.selected : ''}`}
                        onClick={() => handleClick(null)}
                    >All</button>
                </li>
                {
                    categories.map((category) => (
                        <li key={category.id} className={styles.item}>
                            <button
                                className={`${styles.link}${selectedCategoryID === category.id ? ' ' + styles.selected : ''}`} 
                                onClick={() => handleClick(category)}
                                >
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