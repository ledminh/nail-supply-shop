import { FunctionComponent } from "react";

import styles from './AddForm.module.scss';

import useAddForm from "./useAddForm";

/***************************
 *  Types
 */

export type AddFormData = {
    productName: string;
    serialNumber: string;
    shortDescription: string;
    fullDescription: string;
    price: number;

}

interface AddFormPropsType {
    stylesField: string;
    onChange: (data: AddFormData) => void;
} 

type AddFormType = FunctionComponent<AddFormPropsType>



/***************************
 *  Main Component
 */
const AddForm:AddFormType = ({stylesField, onChange}) => {

    const {
        productName,
        onProductNameChange,
        serialNumber,
        onSerialNumberChange,
        shortDescription,
        onShortDescriptionChange,
        fullDescription,
        onFullDescriptionChange,
        price,
        onPriceChange
    } = useAddForm({onChange});

    return (
        <>
            <div className={stylesField}>
                <label htmlFor="name">Name</label>
                <input type="text" 
                    name="Name" 
                    id="name"
                    value={productName}
                    onChange={onProductNameChange}
                />
            </div>
            <div className={stylesField}>
                <label htmlFor="Serial Number">Serial Number</label>
                <input type="text" 
                    name="Serial Number" 
                    id="serial_number"
                    value={serialNumber}
                    onChange={onSerialNumberChange}
                />
            </div>
            <div className={stylesField}>
                <label htmlFor="Short Description">Short Description</label>
                <input type="text" 
                    name="Short Description" 
                    id="short_description"
                    value={shortDescription}
                    onChange={onShortDescriptionChange}
                />
            </div>
            <div className={stylesField}>
                <label htmlFor="Full Description">Full Description</label>
                <textarea name="Full Description"
                    rows={4}
                    id="full_description"
                    value={fullDescription}
                    onChange={onFullDescriptionChange}
                />
            </div>
            <div className={stylesField}>
                <label htmlFor="price">Price</label>
                <input 
                    type="number" 
                    name="price" 
                    id="price"
                    value={price} 
                    onChange={onPriceChange}
                    />
            </div>
            <div className={stylesField}>
                <label htmlFor="uploadImage">Upload Image</label>
                <input 
                    name="upload_image" 
                    id="uploadImage" 
                    type="file" 
                    />
            </div>
        </>
    )
}

export default AddForm;


export const isAddFormDataValid = (data: AddFormData) => {
    if(data.productName === "") return false;
    if(data.serialNumber === "") return false;
    if(data.shortDescription === "") return false;
    if(data.fullDescription === "") return false;
    if(data.price === 0) return false;

    return true;
}
