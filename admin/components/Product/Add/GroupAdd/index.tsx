import { FunctionComponent } from "react";

import styles from './GroupAdd.module.scss';

import useGroupAdd from "./useGroupAdd";

import AddForm from "../AddForm";

/***************************
 *  Types
 */
interface GroupAddPropsType {
    stylesField: string;

} 

type GroupAddType = FunctionComponent<GroupAddPropsType>



/***************************
 *  Main Component
 */
const GroupAdd:GroupAddType = ({
    stylesField, 
}) => {

    const {
        categories,
        selectedCategoryID,
        onCategoryChange,
        onAddFormChange,
        isAddFormResetting,
        setIsAddFormResetting,
        onCancel,
        onAdd,
        _isAddFormDataValid
    } = useGroupAdd({});

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
                isResetting={isAddFormResetting}
                setIsResetting={setIsAddFormResetting}
            />
            
            <div className={styles.buttons}>
                <button className={styles.add}
                    disabled={!_isAddFormDataValid} 
                    onClick={onAdd}
                    >
                        Add to group
                    </button>
                <button className={styles.cancel}
                    onClick={onCancel}
                    >
                        Cancel
                    </button>
            </div>
        </div>
    )
}

export default GroupAdd;