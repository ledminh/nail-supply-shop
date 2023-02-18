import { FunctionComponent } from "react";

import Image from "next/image";

import AdminSubSection from "../../../../layouts/AdminSubSection";
import UploadForm from "../../UploadForm";

import styles from './Add.module.scss';

import useAdd from "./useAdd";

/***************************
 *  Types
 */


interface AddPropsType {
} 

type AddType = FunctionComponent<AddPropsType>



/***************************
 *  Main Component
 */
const Add:AddType = () => {

    const {name, onNameChange, description, onDescriptionChange, imgPath, onImgPathChange, onAdd } = useAdd();

    return (
        <AdminSubSection
            title="Add New Category"
            bold
            collapsable
            >
            <form className={styles.wrapper} encType="multipart/form-data" method="post">
                <fieldset className={styles.field}>
                    <label 
                        className={styles.label}
                        htmlFor="name">
                            Name
                    </label>
                    <input 
                        className={styles.input} 
                        type="text" 
                        name="Name" 
                        id="name"
                        value={name}
                        onChange={onNameChange}
                        />
                
                    <label className={styles.label}
                        htmlFor="Description">
                            Description
                    </label>
                    <input 
                        className={styles.input}
                        type="text" 
                        name="Description" 
                        id="description"
                        value={description}
                        onChange={onDescriptionChange}
                    />
                </fieldset>
                <fieldset className={styles.field}>
                    <label 
                        className={styles.label}
                        htmlFor="image">
                        Image
                    </label>
                    <UploadForm 
                        id="image" 
                        inputClassName={styles.input}
                        allowMultipleFiles={false}
                        onImgPathChange={onImgPathChange}
                        />
                </fieldset>

                {
                    imgPath && (
                        <div className={styles.imgWrapper}>
                            <Image
                                src={imgPath}
                                alt={`Category ${name}`}
                                fill
                                style={{
                                    objectFit: 'cover'
                                }}                             
                            />
                        </div>
                    )
                }
                
            
                <button className={styles.button}
                    onClick={onAdd}    
                    disabled={name.length === 0 || description.length === 0 || imgPath === null}
                    >
                    Add
                </button>
            </form>
        </AdminSubSection>
    )
}

export default Add; 