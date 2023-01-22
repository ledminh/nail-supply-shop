import { FunctionComponent } from "react";
import { ProductType } from "../../../../database";

import Item from "./Item";

import styles from './Edit.module.scss';
import AdminSubSection from "../../../../layouts/AdminSubSection";



/***************************
 *  Types
 */
interface EditPropsType {
    products: ProductType[]
} 

type EditType = FunctionComponent<EditPropsType>



/***************************
 *  Main Component
 */
const Edit:EditType = ({products}) => {

    


    return (
        <AdminSubSection
            title="Edit"
            last
            >
            <div className={styles.categories}>
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