import { FunctionComponent } from "react";
import { _CategoryType } from "../../types";

import styles from './Item.module.scss';

import Image from 'next/image';

import EditScreen from "../EditScreen";
import useItem from "./useItem";

/***************************
 *  Types
 */

interface ItemPropsType {
    category: _CategoryType,
    toBeDeleted: boolean
   
} 

type ItemType = FunctionComponent<ItemPropsType>



/***************************
 *  Main Component
 */
const Item:ItemType = ({category, toBeDeleted}) => {

    const {editMode, _category, setEditMode, _setCategory, onDelete} = useItem({category});


    const content = editMode ? (
        <EditScreen
            category={_category}
            setEditMode={setEditMode}
            setCategory={_setCategory}
            />
    ) : (
        <>
            <div className={styles.image}>
                <Image
                    src={_category.imageUrl}
                    alt={_category.name}
                    fill
                    style={{objectFit: 'cover'}}
                    />
            </div>
            <div className={styles.text}>
                <h5>{_category.name}</h5>
                <p>{_category.description}</p>
            </div>
            <div className={styles.buttons}>
                <button className={styles.button + ' ' + styles.edit}
                    onClick={() => {
                        setEditMode(true)
                    }}
                >
                    Edit
                </button>
                <button className={styles.button + ' ' + styles.delete}
                    onClick={onDelete}
                    >Delete</button>
            </div>
        </>
    )


    return (
        <div className={styles.wrapper + (category.new? ' ' + styles.new: '') + (category.newest? ' ' + styles.newest: '') + (toBeDeleted? ' ' + styles.toBeDeleted: '' )}>
            {content}            
        </div>
    )
}

export default Item;