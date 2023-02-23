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

    const {
        name, 
        onNameChange, 
        description, 
        onDescriptionChange, 
        file, 
        onFileChange, 
        onAdd,
        onCancel 
    } = useAdd();

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
                        onFileChange={onFileChange}
                        />
                </fieldset>

                {
                    file && (
                        <div className={styles.imgWrapper}>
                            <Image
                                src={URL.createObjectURL(file)}
                                alt={`Category ${name}`}
                                fill
                                style={{
                                    objectFit: 'cover'
                                }}                             
                            />
                        </div>
                    )
                }
                
                <div className={styles.buttons}>
                    <button className={styles.add}
                        onClick={onAdd}    
                        disabled={name.length === 0 || description.length === 0 || file === null}
                        >
                        Add
                    </button>
                    <button className={styles.cancel}
                        onClick={onCancel}
                        >
                        Cancel
                    </button>
                </div>
            </form>
        </AdminSubSection>
    )
}

export default Add; 