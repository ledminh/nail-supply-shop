import { FunctionComponent, useContext, useState, useEffect } from "react";


import Item from "./Item";

import styles from './Edit.module.scss';
import AdminSubSection from "../../../../layouts/AdminSubSection";
import { _CategoryType } from "../types";

import AdminContext from "../../Context/AdminContext";

/***************************
 *  Types
 */


interface EditPropsType {
    categories: _CategoryType[]
} 

type EditType = FunctionComponent<EditPropsType>



/***************************
 *  Main Component
 */
const Edit:EditType = ({categories}) => {

    const {deletedCatID} = useContext(AdminContext);
    const [_categories, _setCategories] = useState<_CategoryType[]>(categories);
    
    useEffect(() => {
        console.log('deletedCatID: ', deletedCatID);

        if(deletedCatID) {
            setTimeout(() => {
                _setCategories(_categories.filter((category) => category.id !== deletedCatID));
            }, 300);
        
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deletedCatID]);

    return (
        <AdminSubSection
            title="Edit"
            last
            >
            <div className={styles.categories}>
                {
                    _categories.map((category) => (
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