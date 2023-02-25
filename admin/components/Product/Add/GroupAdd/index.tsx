import { FunctionComponent } from "react";

import styles from './GroupAdd.module.scss';

import useGroupAdd from "./useGroupAdd";

import AddForm from "../AddForm";

/***************************
 *  Types
 */
interface GroupAddPropsType {
    stylesField: string;
    setIsDataValid: (isDataValid: boolean) => void;

    isResetting: boolean,
    setIsResetting: (isResetting: boolean) => void;
} 

type GroupAddType = FunctionComponent<GroupAddPropsType>



/***************************
 *  Main Component
 */
const GroupAdd:GroupAddType = ({stylesField, setIsDataValid, isResetting,
    setIsResetting}) => {

    const {
        categories,
        selectedCategoryID,
        onCategoryChange,
        onAddFormChange

    } = useGroupAdd({setIsDataValid});

    return (
        <div className={styles.wrapper}>
            <div className={stylesField}>
                <label htmlFor="category">Category</label>
                <select name="category" id="category"
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
            </div>
            <div className={styles.listProducts}>
                <div className={styles.title}>Other products in group:</div>
                <div className={styles.body}>Product 1, Product 2, Product 3, Product 1, Product 2, Product 3</div>
            </div>

            <AddForm 
                stylesField={stylesField}
                onChange={onAddFormChange}
                isResetting={isResetting}
                setIsResetting={setIsResetting}
            />
            
            <div className={styles.buttons}>
                <button className={styles.add}>Add to group</button>
                <button className={styles.cancel}>Cancel</button>
            </div>
        </div>
    )
}

export default GroupAdd;