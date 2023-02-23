import { FunctionComponent } from "react";

import styles from './SingleAdd.module.scss';

import useSingleAdd from "./useSingleAdd";

import AddForm from "../AddForm";

/***************************
 *  Types
 */
interface SingleAddPropsType {
    stylesField: string
} 

type SingleAddType = FunctionComponent<SingleAddPropsType>



/***************************
 *  Main Component
 */
const SingleAdd:SingleAddType = ({stylesField}) => {

    const {
        categories,
        onCategoryChange
    } = useSingleAdd({});

    return (
        <div className={styles.wrapper}>
            <div className={stylesField}>
                <label htmlFor="category">Category</label>
                <select name="category" id="category"
                    onChange={onCategoryChange}
                    >
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>
            <AddForm 
                stylesField={stylesField}
                onChange={(data) => {console.log(data)}}
            />
        </div>
    )
}

export default SingleAdd;