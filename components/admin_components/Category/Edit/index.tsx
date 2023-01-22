import { FunctionComponent } from "react";
import { CategoryType } from "../../../../database";

import Item from "./Item";

import styles from './Edit.module.scss';
import AdminSubSection from "../../../../layouts/AdminSubSection";



/***************************
 *  Types
 */
interface EditPropsType {
    categories: CategoryType[]
} 

type EditType = FunctionComponent<EditPropsType>



/***************************
 *  Main Component
 */
const Edit:EditType = ({categories}) => {

    


    return (
        <AdminSubSection
            title="Edit"
            last
            >
            <div className={styles.categories}>
                {
                    categories.map((category, index) => (
                        <Item 
                            key={index}
                            category={category}
                            />
                    ))
                }
            </div>
        </AdminSubSection>
    )
}

export default Edit;