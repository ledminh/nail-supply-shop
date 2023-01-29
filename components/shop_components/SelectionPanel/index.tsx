import { FunctionComponent, useState } from "react";

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
    
    const [index, setIndex] = useState<number>(0);

    return (
        <div className={styles.wrapper}>
            <select className={styles.select} 
                    onChange={(e) => {
                        setIndex(+e.target.value);
                        onChange(e.target.value === ''? null : categories[+e.target.value]);
                    }}
                    value={index}>
                <option key='all' value={''} selected>All</option>
                {categories.map((category, index) => (
                    <option key={category.id} value={index}>{category.name}</option>
                ))}
            </select>
        </div>
    )
}

export default SelectionPanel;