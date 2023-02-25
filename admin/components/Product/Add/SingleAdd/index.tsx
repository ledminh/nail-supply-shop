import { FunctionComponent } from "react";

import styles from './SingleAdd.module.scss';

import useSingleAdd from "./useSingleAdd";

import AddForm from "../AddForm";

/***************************
 *  Types
 */

export type SingleAddData = {
    categoryID: string;
    productName: string;
    serialNumber: string;
    shortDescription: string;
    fullDescription: string;
    price: number;
    files: File[];
}

interface SingleAddPropsType {
    stylesField: string;
    setIsDataValid: (isDataValid: boolean) => void;
    isResetting: boolean;
    setIsResetting: (isResetting: boolean) => void;
    onProductChange: (product: SingleAddData) => void;
} 

type SingleAddType = FunctionComponent<SingleAddPropsType>



/***************************
 *  Main Component
 */
const SingleAdd:SingleAddType = ({stylesField, setIsDataValid, isResetting, setIsResetting, onProductChange}) => {

    const {
        categories,
        selectedCategoryID,
        onCategoryChange,
        onAddFormChange,
    } = useSingleAdd({setIsDataValid, onProductChange});

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
            <AddForm 
                stylesField={stylesField}
                onChange={onAddFormChange}
                isResetting={isResetting}
                setIsResetting={setIsResetting}
            />
        </div>
    )
}

export default SingleAdd;