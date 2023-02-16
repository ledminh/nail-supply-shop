import { FunctionComponent } from "react";

import styles from './EditScreen.module.scss';

import Image from 'next/image';

import { _CategoryType } from "../../../types";

import  useEditScreen  from "./hooks";

/***************************
 *  Types
 */
interface EditScreenPropsType {
    category: _CategoryType;
    setEditMode: (value: boolean) => void;
} 

type EditScreenType = FunctionComponent<EditScreenPropsType>



/***************************
 *  Main Component
 */
const EditScreen:EditScreenType = ({category, setEditMode}) => {

    const {categoryName, categoryDescription, handleCategoryNameChange, handleCategoryDescriptionChange} = useEditScreen({category});


    return (
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
                <input type="text" value={categoryName} onChange={handleCategoryNameChange} />
                <textarea value={categoryDescription} onChange={handleCategoryDescriptionChange} />

            </div>
            <div className={styles.buttons}>
                <button className={styles.button}
                    onClick={() => {
                        setEditMode(false)
                    }}
                >
                    Save
                </button>
                <button className={styles.button}>Delete</button>
            </div>
        </>
    )
}

export default EditScreen;