import { FunctionComponent } from "react";

import styles from './CategoryMenu.module.scss';


import { CategoryType } from '../../../database';



/***************************
 *  Types
 */
interface CategoryMenuPropsType {
    categories: CategoryType[];
    selectedCategoryID: string|null;
    onChange: (destCat: CategoryType|null) => void;
} 

type CategoryMenuType = FunctionComponent<CategoryMenuPropsType>



/***************************
 *  Main Component
 */
const CategoryMenu:CategoryMenuType = ({selectedCategoryID, categories, onChange}) => {

    


    

    return (
        <div className={styles.wrapper}>
            <h4 className={styles.title}>CATEGORIES</h4>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <button
                        className={`${styles.link}${selectedCategoryID === null ? ' ' + styles.selected : ''}`}
                        onClick={() => onChange(null)}
                    >All</button>
                </li>
                {
                    categories.map((category) => (
                        <li key={category.id} className={styles.item}>
                            <button
                                className={`${styles.link}${selectedCategoryID === category.id ? ' ' + styles.selected : ''}`} 
                                onClick={() => onChange(category)}
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