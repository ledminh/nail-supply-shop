import { FunctionComponent } from "react";
import { CategoryType } from "../../../../database";
import AdminSubSection from "../../../../layouts/AdminSubSection";

import styles from './Add.module.scss';
import AddForm from "./AddForm";

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

                <AddForm 
                    stylesField={styles.field}
                    onChange={(data) => {console.log(data)}}
                />
                
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