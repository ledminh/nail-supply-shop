import { FunctionComponent } from "react";

import styles from './GroupAdd.module.scss';

import useGroupAdd from "./useGroupAdd";

import AddForm from "../AddForm";

/***************************
 *  Types
 */
interface GroupAddPropsType {
    stylesField: string
} 

type GroupAddType = FunctionComponent<GroupAddPropsType>



/***************************
 *  Main Component
 */
const GroupAdd:GroupAddType = ({stylesField}) => {

    const {categories, onCategoryChange} = useGroupAdd({});

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
            <div className={stylesField}>
                <div>Other products in group:</div>
                <div>Product 1, Product 2, Product 3, Product 1, Product 2, Product 3</div>
            </div>

            <AddForm 
                stylesField={stylesField}
                onChange={(data) => {console.log(data)}}
            />
            
            <div className={stylesField}>
                <button className={styles.add}>Add to group</button>
                <button className={styles.cancel}>Cancel</button>
            </div>
        </div>
    )
}

export default GroupAdd;