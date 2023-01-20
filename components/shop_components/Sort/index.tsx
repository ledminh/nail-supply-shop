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
            <h4>SORT</h4>
            <div className={styles.sortCriteria}>
                <div className={styles.sort}>
                    <select name="sort" id="sort">
                        <option value="price">Price</option>
                        <option value="name">Name</option>
                    </select>
                </div>
                <div className={styles.order}>
                    <select name="order" id="order">
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default Sort;