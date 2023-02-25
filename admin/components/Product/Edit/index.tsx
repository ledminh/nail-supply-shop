import { FunctionComponent } from "react";
import { CategoryType, ProductGroupType, ProductType } from "../../../../database";

import Item from "./Item";

import useEdit from "./useEdit";

import styles from './Edit.module.scss';
import AdminSubSection from "../../../../layouts/AdminSubSection";



/***************************
 *  Types
 */
interface EditPropsType {
} 

type EditType = FunctionComponent<EditPropsType>



/***************************
 *  Main Component
 */
const Edit:EditType = () => {

    const {
        categories,
        selectedCategoryID,
        onCategoryChange,
        currentProducts,
    } = useEdit();


    return (
        <AdminSubSection
            title="Edit"
            last
            >
            <div className={styles.wrapper}>
                <select
                    className={styles.select}
                    name="category" 
                    id="category"
                    onChange={onCategoryChange}
                    value={selectedCategoryID}
                    >
                    {categories.map((category) => (
                        <option 
                            key={category.id} 
                            value={category.id}
                            >
                                {category.name}
                        </option>
                    ))}
                </select>
                {
                    currentProducts.map((product, index) => (
                        <Item 
                            key={index}
                            data={product}
                            />
                    ))
                }
            </div>    
        </AdminSubSection>
    )
}

export default Edit;