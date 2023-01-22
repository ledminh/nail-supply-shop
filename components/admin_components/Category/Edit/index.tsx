import { FunctionComponent } from "react";
import { CategoryType } from "../../../../database";

import Item from "./Item";

import styles from './Edit.module.scss';



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
        <div className={styles.wrapper}>
            <h4>Edit</h4>
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
        </div>
    )
}

export default Edit;