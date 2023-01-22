import { FunctionComponent } from "react";
import { CategoryType } from "../../../../../database";

import styles from './Item.module.scss';

/***************************
 *  Types
 */
interface ItemPropsType {
    category: CategoryType
} 

type ItemType = FunctionComponent<ItemPropsType>



/***************************
 *  Main Component
 */
const Item:ItemType = ({category}) => {

    return (
        <div className={styles.wrapper}>
            <h5>{category.name}</h5>
            <p>{category.description}</p>
            <div className={styles.buttons}>
                <button className={styles.button}>Edit</button>
                <button className={styles.button}>Delete</button>
            </div>
        </div>
    )
}

export default Item;