import { FunctionComponent } from "react";

import styles from './AllCategory.module.scss';

/***************************
 *  Types
 */
interface AllCategoryPropsType {

} 

type AllCategoryType = FunctionComponent<AllCategoryPropsType>



/***************************
 *  Main Component
 */
const AllCategory:AllCategoryType = () => {

    return (
        <div className={styles.wrapper}>
            AllCategory component
        </div>
    )
}

export default AllCategory;