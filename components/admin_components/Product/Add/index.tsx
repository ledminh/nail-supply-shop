import { useState, FunctionComponent } from "react";
import { CategoryType } from "../../../../database";

import styles from './Add.module.scss';



/***************************
 *  Types
 */
interface AddPropsType {
    categories: CategoryType[],
    onClick: (data: {categoryId: string, name: string, shortDescription: string, fullDescription: string, imageUrl: string}) => void
} 

type AddType = FunctionComponent<AddPropsType>



/***************************
 *  Main Component
 */
const Add:AddType = ({categories, onClick}) => {

    const [categoryId, setCategoryId] = useState(categories[0].id);
    const [name, setName] = useState<string>('');
    const [shortDescription, setShortDescription] = useState<string>('');
    const [fullDescription, setFullDescription] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');

    


    return (
        <div className={styles.wrapper}>
            <h4>Add</h4>
            <form className={styles.form}>
                <div className={styles.field}>
                    <label htmlFor="category">Category</label>
                    <select name="category" id="category"
                        onChange={(e) => {
                            setCategoryId(e.target.value);
                        }}
                        >
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.field}>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="Name" id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor="Short Description">Short Description</label>
                    <input type="text" name="Short Description" id="short_description"
                        value={shortDescription}
                        onChange={(e) => setShortDescription(e.target.value)}
                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor="Full Description">Full Description</label>
                    <textarea name="Full Description"
                    rows={4}
                    id="full_description"
                        value={fullDescription}
                        onChange={(e) => setFullDescription(e.target.value)}
                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor="uploadImage">Upload Image</label>
                    <input name="upload_image" id="uploadImage" type="file" />
                </div>
                <button className={styles.button}
                    onClick={(e) => {
                        e.preventDefault();

                        onClick({
                            categoryId,
                            name,
                            shortDescription,
                            fullDescription,
                            imageUrl: ''
                        });
                    }}
                    >
                    Add
                </button>
            </form>
        </div>
    )
}

export default Add;