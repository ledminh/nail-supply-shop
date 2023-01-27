import React, { FunctionComponent } from "react";

import styles from './SelectionPanel.module.scss';

import { CategoryType } from '../../../database';

/***************************
 *  Types
 */
interface SelectionPanelPropsType {
    categories: CategoryType[];
    onChange: (catID: string) => void;
} 

type SelectionPanelType = FunctionComponent<SelectionPanelPropsType>



/***************************
 *  Main Component
 */
const SelectionPanel:SelectionPanelType = ({categories, onChange}) => {
    

    return (
        <div className={styles.wrapper}>
            <select className={styles.select} onChange={(e) => onChange(e.target.value)}>
                <option key='all' value="CAT/ALL" selected>All</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
            </select>
        </div>
    )
}

export default SelectionPanel;