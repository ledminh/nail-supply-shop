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
    handleCategoryChange: (catID: string) => void;
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
            <div>
                <h4>PRICE</h4>
                <div>
                    <input type="range" min="0" max="100" value="50" className="slider" id="myRange" />
                </div>
            </div>
        </div>
    )
}

export default SideBar;