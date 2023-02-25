import { FunctionComponent } from "react";

import styles from './GroupAdd.module.scss';

import useGroupAdd from "./useGroupAdd";

import AddForm from "../AddForm";

/***************************
 *  Types
 */
export type ProductGroupToAdd = {
    _id: string;
    groupName: string;
    mainProduct: boolean;
    variantName: string;
    serialNumber: string;
    shortDescription: string;
    fullDescription: string;
    price: number;
    files: File[];
}[];

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
            <div className={stylesField}>
                <label htmlFor="group-name">Group name</label>
                <input type="text" name="group-name" id="group-name" />
            </div>
            <div className={stylesField}>
                <label htmlFor="main-product">Main Product</label>
                <select name="main-product" id="main-product">
                    <option value="product-1">Product 1</option>
                    <option value="product-2">Product 2</option>
                    <option value="product-3">Product 3</option>
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