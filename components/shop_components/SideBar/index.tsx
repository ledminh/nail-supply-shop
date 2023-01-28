import { FunctionComponent } from "react";

import styles from './SideBar.module.scss';

import { CategoryType } from '../../../database';
import Categories from "./Categories";

/***************************
 *  Types
 */
interface SideBarPropsType {
    categories: CategoryType[];
    selectedCategoryID: string|null;
    handleCategoryChange: (currentCategory: CategoryType|null) => void;
} 

type SideBarType = FunctionComponent<SideBarPropsType>



/***************************
 *  Main Component
 */
const SideBar:SideBarType = ({categories, selectedCategoryID, handleCategoryChange}) => {

    return (
        <div className={styles.wrapper}>
            <Categories
                categories={categories}
                selectedCategoryID={selectedCategoryID}
                handleCategoryChange={handleCategoryChange}
                />
        </div>
    )
}

export default SideBar;