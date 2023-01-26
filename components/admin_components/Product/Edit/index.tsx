import { FunctionComponent } from "react";
import { CategoryType, ProductType } from "../../../../database";

import Item from "./Item";

import styles from './Edit.module.scss';
import AdminSubSection from "../../../../layouts/AdminSubSection";



/***************************
 *  Types
 */
interface EditPropsType {
    products: ProductType[];
    categories: CategoryType[];
} 

type EditType = FunctionComponent<EditPropsType>



/***************************
 *  Main Component
 */
const Edit:EditType = ({categories, products}) => {


    return (
        <AdminSubSection
            title="Edit"
            last
            >
            <div className={styles.wrapper}>
                <select className={styles.select}>
                    <option value="title">Category</option>
                    {
                        categories.map((category, index) => (
                            <option key={index} value={category.id}>{category.name}</option>
                        ))
                    }
                </select>
                {
                    products.map((product, index) => (
                        <Item 
                            key={index}
                            product={product}
                            />
                    ))
                }
            </div>    
        </AdminSubSection>
    )
}

export default Edit;