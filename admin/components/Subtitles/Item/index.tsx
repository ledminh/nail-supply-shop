import { FunctionComponent } from "react";

import styles from './Item.module.scss';

/***************************
 *  Types
 */
interface ItemPropsType {
    name:string;
} 

type ItemType = FunctionComponent<ItemPropsType>



/***************************
 *  Main Component
 */
const Item:ItemType = ({name}) => {

    return (
        <form className={styles.wrapper}>
            <label className={styles.label} htmlFor={`${name}Subtitle`}>{name.toUpperCase()}</label>
            <input className={styles.input} type="text" name={`${name}Subtitle`} id={`${name}Subtitle`}/>
            <button className={styles.button}>
                Save
            </button>
        </form>
    )
}

export default Item;