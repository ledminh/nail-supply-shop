import { FunctionComponent } from "react";

import styles from './SideBar.module.scss';

import { CategoryType } from '../../../database';

/***************************
 *  Types
 */
interface SideBarPropsType {
    categories: CategoryType[];
    selectedCategoryID: string|null;
    handleCategoryChange: (catID: string) => void;
} 

type SideBarType = FunctionComponent<SideBarPropsType>



/***************************
 *  Main Component
 */
const SideBar:SideBarType = ({categories, selectedCategoryID, handleCategoryChange}) => {

    return (
        <div className={styles.wrapper}>
            <h4 className={styles.title}>CATEGORIES</h4>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <button
                        className={selectedCategoryID === null ? styles.selected : ''}
                        onClick={() => handleCategoryChange('CAT/ALL')}
                    >All</button>
                </li>
                {
                    categories.map((category) => (
                        <li key={category.id} className={styles.item}>
                            <button
                                className={selectedCategoryID === category.id ? styles.selected : ''} 
                                onClick={() => handleCategoryChange(category.id)}>
                                {category.name}
                            </button>
                        </li>
                    ))
                }
            </ul>    
        </div>
    )
}

export default SideBar;