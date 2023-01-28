import React, { FunctionComponent } from "react";

import styles from './SelectionPanel.module.scss';

import { CategoryType } from '../../../database';

/***************************
 *  Types
 */
interface SelectionPanelPropsType {
    categories: CategoryType[];
    onChange: (currentCategory: CategoryType|null) => void;
} 

type SelectionPanelType = FunctionComponent<SelectionPanelPropsType>



/***************************
 *  Main Component
 */
const SelectionPanel:SelectionPanelType = ({categories, onChange}) => {
    

    return (
        <div className={styles.wrapper}>
            <select className={styles.select} onChange={(e) => onChange(e.target.value === ''? null : categories[+e.target.value])}>
                <option key='all' value={''} selected>All</option>
                {categories.map((category, index) => (
                    <option key={category.id} value={index}>{category.name}</option>
                ))}
            </select>
        </div>
    )
}

export default SelectionPanel;