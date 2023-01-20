import { FunctionComponent } from "react";

import styles from './Sort.module.scss';

/***************************
 *  Types
 */
interface SortPropsType {

} 

type SortType = FunctionComponent<SortPropsType>



/***************************
 *  Main Component
 */
const Sort:SortType = () => {

    return (
        <div className={styles.wrapper}>
            Sort component
        </div>
    )
}

export default Sort;