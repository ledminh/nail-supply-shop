import { FunctionComponent } from "react";
import { CategoryInfoType } from "../../../database";

import styles from './Category.module.scss';

/***************************
 *  Types
 */
interface CategoryPropsType {
    categoryInfos: CategoryInfoType[]

} 

type CategoryComponentType = FunctionComponent<CategoryPropsType>



/***************************
 *  Main Component
 */
const CategoryComponent:CategoryComponentType = ({categoryInfos}) => {

    return (
        <div className={styles.wrapper}>
            <h3 className={styles.h2}>Category</h3>
            <div className={styles.add}>
                <h4>Add</h4>
                <form className={styles.form}>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name"/>
                    <button className={styles.button}>Add</button>
                </form>
            </div>
            <h4>Edit</h4>
            <div className={styles.categories}>
                {
                    categoryInfos.map((category, index) => (
                        <div className={styles.category} key={index}>
                            <h5>{category.name}</h5>
                            <div className={styles.buttons}>
                                <button className={styles.button}>Edit</button>
                                <button className={styles.button}>Delete</button>
                            </div>
                        </div>
                    ))
                }
            </div>
            

        </div>
    )
}

export default CategoryComponent;