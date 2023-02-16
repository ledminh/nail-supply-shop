import { FunctionComponent } from "react";
import { _CategoryType } from "../../types";

import styles from './Item.module.scss';

import Image from 'next/image';

import { useState } from "react";
import EditScreen from "./EditScreen";

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

    const [editMode, setEditMode] = useState(false);    

    const content = editMode ? (
        <EditScreen
            category={category}
            setEditMode={setEditMode}
            />
    ) : (
        <>
            <div className={styles.image}>
                <Image
                    src={category.imageUrl}
                    alt={category.name}
                    fill
                    style={{objectFit: 'cover'}}
                    />
            </div>
            <div className={styles.text}>
                <h5>{category.name}</h5>
                <p>{category.description}</p>
            </div>
            <div className={styles.buttons}>
                <button className={styles.button}
                    onClick={() => {
                        setEditMode(true)
                    }}
                >
                    Edit
                </button>
                <button className={styles.button}>Delete</button>
            </div>
        </>
    )


    return (
        <div className={styles.wrapper + (category.new? ' ' + styles.new: '') + (category.newest? ' ' + styles.newest: '')}>
            {content}            
        </div>
    )
}

export default Item;