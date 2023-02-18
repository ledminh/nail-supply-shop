import { FunctionComponent } from "react";

import styles from './EditScreen.module.scss';

import Image from 'next/image';

import { _CategoryType } from "../../types";

import  useEditScreen  from "./useEditScreen";

/***************************
 *  Types
 */
interface EditScreenPropsType {
    category: _CategoryType;
    setCategory: (value: _CategoryType) => void;
    setEditMode: (value: boolean) => void;
} 

type EditScreenType = FunctionComponent<EditScreenPropsType>



/***************************
 *  Main Component
 */
const EditScreen:EditScreenType = ({category, setCategory, setEditMode}) => {

    const {
        categoryName, 
        onCategoryNameChange, 
        categoryDescription, 
        onCategoryDescriptionChange, 
        onImageClick, 
        // imageFile, 
        // onSave, 
        onCancel} = useEditScreen({
                                category, 
                                setCategory, 
                                setEditMode
                            });


    return (
        <>
            <button className={styles.image}
                onClick={onImageClick}
            >
                <Image
                    src={imageFile? URL.createObjectURL(imageFile): category.imageUrl}
                    alt={category.name}
                    fill
                    style={{objectFit: 'cover'}}
                    />
            </button>
            <div className={styles.text}>
                <input type="text" value={categoryName} onChange={onCategoryNameChange} />
                <textarea value={categoryDescription} onChange={onCategoryDescriptionChange} />
            </div>
            <div className={styles.buttons}>
                <button className={styles.button + ' ' + styles.save}
                    onClick={onSave}
                >
                    Save
                </button>
                <button className={styles.button + ' ' + styles.cancel}
                    onClick={onCancel}
                >Cancel</button>
            </div>
        </>
    )
}

export default EditScreen;