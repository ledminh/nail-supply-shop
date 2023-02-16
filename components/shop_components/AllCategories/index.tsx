import { FunctionComponent } from "react";

import styles from './AllCategories.module.scss';

/***************************
 *  Types
 */
interface AllCategoriesPropsType {

} 

type AllCategoriesType = FunctionComponent<AllCategoriesPropsType>



/***************************
 *  Main Component
 */
const AllCategories:AllCategoriesType = () => {

    return (
        <div className={styles.wrapper}>
            <h3 className={styles.title}>All Products</h3>
        </div>
    )
}

export default AllCategories;