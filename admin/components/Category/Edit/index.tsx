import { FunctionComponent } from "react";


import Item from "./Item";

import styles from './Edit.module.scss';
import AdminSubSection from "../../../../layouts/AdminSubSection";

import useEdit from "./useEdit";

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

    const {categories} = useEdit();

    return (
        <AdminSubSection
            title="Edit"
            last
            >
            <div className={styles.categories}>
                {
                    categories.map((category) => (
                        <Item 
                            key={category.id}
                            category={category}
                            toBeDeleted={deletedCatID === category.id}
                            />
                    ))
                }
            </div>
        </AdminSubSection>
    )
}

export default Edit;