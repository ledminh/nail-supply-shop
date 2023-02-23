import { FunctionComponent } from "react";
import { CategoryType } from "../../../../database";
import AdminSubSection from "../../../../layouts/AdminSubSection";

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
        onCategoryChange,
        categories,
        productName,
        onProductNameChange,
        shortDescription,
        onShortDescriptionChange,
        fullDescription,
        onFullDescriptionChange,
        onAddClick,
        onCancelClick
    } = useAdd();

    


    return (
        <AdminSubSection
            title="Add New Product"
            bold
            collapsable
            >
            <form className={styles.wrapper}>
                <div className={styles.field}>
                    <button>Single</button>
                    <button>Group</button>
                </div>
                <div className={styles.field}>
                    <label htmlFor="category">Category</label>
                    <select name="category" id="category"
                        onChange={onCategoryChange}
                        >
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.field}>
                    <div>Other products in group:</div>
                    <div>Product 1, Product 2, Product 3, Product 1, Product 2, Product 3</div>
                </div>
                <div className={styles.field}>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="Name" id="name"
                        value={productName}
                        onChange={onProductNameChange}
                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor="Short Description">Short Description</label>
                    <input type="text" name="Short Description" id="short_description"
                        value={shortDescription}
                        onChange={onShortDescriptionChange}
                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor="Full Description">Full Description</label>
                    <textarea name="Full Description"
                    rows={4}
                    id="full_description"
                        value={fullDescription}
                        onChange={onFullDescriptionChange}
                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" id="price" />
                </div>
                <div className={styles.field}>
                    <label htmlFor="uploadImage">Upload Image</label>
                    <input name="upload_image" id="uploadImage" type="file" />
                </div>
                <div className={styles.field}>
                    <button>Add to group</button>
                    <button>Cancel</button>
                </div>
                <div className={styles.field}>
                    <button className={styles.button + " " + styles.add}
                        onClick={onAddClick}>
                        Add
                    </button>
                    <button className={styles.button + " " + styles.cancel}
                        onClick={onCancelClick}>
                        Cancel
                    </button>
                </div>
            </form>
        </AdminSubSection>
    )
}

export default Add;