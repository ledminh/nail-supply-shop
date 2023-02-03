import { FunctionComponent, useState } from "react";

import styles from './CategorySelect.module.scss';

import { CategoryType } from '../../../database';

/***************************
 *  Types
 */
interface CategorySelectPropsType {
    categories: CategoryType[];
    selectedCategoryID: string|null;
    onChange: (currentCategory: CategoryType|null) => void;
} 

type CategorySelectType = FunctionComponent<CategorySelectPropsType>



/***************************
 *  Main Component
 */
const CategorySelect:CategorySelectType = ({categories, selectedCategoryID, onChange}) => {
    
    const index = selectedCategoryID === null? '' : categories.findIndex((category) => category.id === selectedCategoryID);

    return (
        <div className={styles.wrapper}>
            <select className={styles.select}
                    onChange={(e) => {
                        onChange(e.target.value === ''? null : categories[+e.target.value]);
                    }}
                    value={index}>
                <option key='all' value={''}>All</option>
                {categories.map((category, index) => (
                    <option key={category.id} value={index}>{category.name}</option>
                ))}
            </select>
        </div>
    )
}

export default CategorySelect;