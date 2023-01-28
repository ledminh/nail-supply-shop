import { FunctionComponent } from "react";
import { ProductType } from "../../../../../database";

import styles from './Item.module.scss';

/***************************
 *  Types
 */
interface ItemPropsType {
    product: ProductType
} 

type ItemType = FunctionComponent<ItemPropsType>



/***************************
 *  Main Component
 */
const Item:ItemType = ({product}) => {

    return (
        <div className={styles.wrapper}>
            <h5>{product.name}</h5>
            <p>{product.fullDescription}</p>
            <div className={styles.buttons}>
                <button className={styles.button}>Edit</button>
                <button className={styles.button}>Delete</button>
            </div>
        </div>
    )
}

export default Item;