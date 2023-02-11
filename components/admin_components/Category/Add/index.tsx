import { useState, FunctionComponent, MouseEventHandler } from "react";
import { CategoryType } from "../../../../database";
import AdminSubSection from "../../../../layouts/AdminSubSection";
import UploadForm from "../../UploadForm";

import styles from './Add.module.scss';



/***************************
 *  Types
 */

export type NewCategoryType = {
    name: string,
    description: string,
    image: File
}

interface AddPropsType {
    onClick: (formData: FormData) => void
} 

type AddType = FunctionComponent<AddPropsType>



/***************************
 *  Main Component
 */
const Add:AddType = ({onClick}) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [errors, setErrors] = useState<string[]>([]);
    

    const _onClick:MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();

        setErrors([]); 

        if(name === '' || description === '') {
            if(name === '') setErrors(prev => [...prev, 'Name is required']);

            if(description === '') setErrors(prev => [...prev, 'Description is required']);


            return;
        }

        const formData = new FormData();

        formData.append('name', name);
        formData.append('description', description);



        onClick(formData);
    
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
                    />
                </fieldset>
                {
                    errors.map((error, index) => (
                        <p key={index} className={styles.error}>{error}</p>
                    ))
                }
            
                <button className={styles.button}
                    onClick={_onClick}
                    >
                    Add
                </button>
            </form>
        </AdminSubSection>
    )
}

export default Add;