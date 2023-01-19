import { FunctionComponent } from "react";

import styles from './SideBar.module.scss';

import { CategoryType } from '../../../database';

/***************************
 *  Types
 */
interface SideBarPropsType {
    categories: CategoryType[];
} 

type SideBarType = FunctionComponent<SideBarPropsType>



/***************************
 *  Main Component
 */
const SideBar:SideBarType = ({categories}) => {

    return (
        <div className={styles.wrapper}>
            <h4 className={styles.title}>CATEGORIES</h4>
            <ul className={styles.list}>
                <li className={styles.item}>All</li>
                {
                    categories.map((category) => (
                        <li key={category.id} className={styles.item}>{category.name}</li>
                    ))
                }
            </ul>    
        </div>
    )
}

export default SideBar;