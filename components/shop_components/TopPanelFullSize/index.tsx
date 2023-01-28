import { FunctionComponent } from "react";

import styles from './TopPanelFullSize.module.scss';
import PriceFilter from "../PriceFilter";
import Sort from "../Sort";

/***************************
 *  Types
 */
interface TopPanelFullSizePropsType {

} 

type TopPanelFullSizeType = FunctionComponent<TopPanelFullSizePropsType>



/***************************
 *  Main Component
 */
const TopPanelFullSize:TopPanelFullSizeType = () => {

    return (
        <div className={styles.wrapper}>
            <PriceFilter />
            <Sort/>
        </div>
    )
}

export default TopPanelFullSize;