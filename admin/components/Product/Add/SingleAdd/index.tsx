import { FunctionComponent } from "react";

import styles from './SingleAdd.module.scss';

import useSingleAdd from "./useSingleAdd";

import AddForm from "../AddForm";

import CategoryList from "../CategoryList";

/***************************
 *  Types
 */

export type SingleAddData = {
    categoryID: string;
    productName: string;
    id: string;
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
            <CategoryList
                stylesField={stylesField}
                onCategoryChange={onCategoryChange}
                selectedCategoryID={selectedCategoryID}
                categories={categories}
            />
            <AddForm 
                stylesField={stylesField}
                onChange={onAddFormChange}
                isResetting={isResetting}
                setIsResetting={setIsResetting}
                feedingData={null}
                setFeedingData={() => {}}
            />
        </div>
    )
}

export default SingleAdd;