import { FunctionComponent } from "react";

import styles from './TopPanelMobile.module.scss';
import { CategoryType } from "../../../database";

import SelectionPanel from "../SelectionPanel";

/***************************
 *  Types
 */
interface TopPanelMobilePropsType {
    categories: CategoryType[];
    handleCategoryChange: (currentCategory: CategoryType|null) => void;
} 

type TopPanelMobileType = FunctionComponent<TopPanelMobilePropsType>



/***************************
 *  Main Component
 */
const TopPanelMobile:TopPanelMobileType = ({categories, handleCategoryChange}) => {

    return (
    <div className={styles.wrapper}>
        <SelectionPanel
            categories={categories}
            onChange={handleCategoryChange}
        />
    </div>
    )
}

export default TopPanelMobile;