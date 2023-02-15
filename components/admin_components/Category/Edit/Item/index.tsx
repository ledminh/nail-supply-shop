import { FunctionComponent } from "react";
import { _CategoryType } from "../../types";

import styles from './Item.module.scss';

/***************************
 *  Types
 */

interface ItemPropsType {
    category: _CategoryType
   
} 

type ItemType = FunctionComponent<ItemPropsType>



/***************************
 *  Main Component
 */
const Item:ItemType = ({category}) => {

    return (
        <div className={styles.wrapper + (category.new? ' ' + styles.new: '') + (category.newest? ' ' + styles.newest: '')}>
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