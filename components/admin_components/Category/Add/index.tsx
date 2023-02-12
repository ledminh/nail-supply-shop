import { useState, FunctionComponent, MouseEventHandler, useEffect } from "react";

import Image from "next/image";

import AdminSubSection from "../../../../layouts/AdminSubSection";
import UploadForm from "../../UploadForm";

import styles from './Add.module.scss';

import { NewCategoryType } from "../../../../database/types";

/***************************
 *  Types
 */


interface AddPropsType {
    handleAdd: (data: NewCategoryType) => void
} 

type AddType = FunctionComponent<AddPropsType>



/***************************
 *  Main Component
 */
const Add:AddType = ({handleAdd}) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [errors, setErrors] = useState<string[]>([]);
    
    const [imgPath, setImgPath] = useState<string|null>(null);
    



    const _onClick:MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();

        setErrors([]); 

        // validate all fields then add to errors array

        // all thing ok, add to database
        handleAdd({
            name,
            description,
            imageUrl: imgPath || ''
        });


    
    }

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
                        onChange={(e) => setName(e.target.value)}
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
                        onChange={(e) => setDescription(e.target.value)}
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
                        onFileChange={(fileName) => {
                            if(fileName) setImgPath(`/images/category/${fileName}`);
                            else setImgPath(null);
                        }}
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
                
                {
                    errors.map((error, index) => (
                        <p key={index} className={styles.error}>{error}</p>
                    ))
                }
            
                <button className={styles.button}
                    onClick={_onClick}
                    disabled={name.length === 0 || description.length === 0 || imgPath === null}
                    >
                    Add
                </button>
            </form>
        </AdminSubSection>
    )
}

export default Add;