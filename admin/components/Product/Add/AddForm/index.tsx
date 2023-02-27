import { FunctionComponent, MouseEventHandler } from "react";

import Image from "next/image";

import styles from './AddForm.module.scss';

import useAddForm from "./useAddForm";

import CloseIconSVG from '../../../../../assets/images/close_icon.svg';

/***************************
 *  Types
 */

export type AddFormData = {
    productName: string;
    serialNumber: string;
    shortDescription: string;
    fullDescription: string;
    price: number;
    files: File[];

}

interface AddFormPropsType {
    stylesField: string;
    onChange: (data: AddFormData) => void;
    isResetting: boolean;
    setIsResetting: (isResetting: boolean) => void;
    feedingData: AddFormData|null;
    setFeedingData: (feedingData: AddFormData|null) => void;
} 

type AddFormType = FunctionComponent<AddFormPropsType>



/***************************
 *  Main Component
 */
const AddForm:AddFormType = ({stylesField, onChange, isResetting, setIsResetting, feedingData, setFeedingData}) => {

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
        onPriceChange,
        files,
        onFilesChange,
        buttonImageOnClick
    } = useAddForm({onChange, isResetting, setIsResetting, feedingData, setFeedingData});

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
                
                <label
                    className={styles.filesLabel}
                    htmlFor="uploadImage">
                        Upload Images
                </label>
                <input
                    className={styles.filesInput}
                    name="upload_image" 
                    id="uploadImage" 
                    type="file"
                    accept="image/*"
                    multiple={true}
                    
                    onChange={onFilesChange}
                    />
            </div>
            {
                // Show images if there is any
                files.length > 0 && (
                    <div className={stylesField}>
                        <label>Images</label>
                        <ul className={styles.images}>
                            {
                                files.map((file, index) => (
                                    <li key={index}>
                                        <ButtonImage
                                            file={file}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                buttonImageOnClick(file);
                                            }}
                                        />
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                )
            }
        </>
    )
}

export default AddForm;




export const isAddFormDataValid = (data: AddFormData) => {
    if(data.productName === "") return false;
    if(data.serialNumber === "") return false;
    if(data.shortDescription === "") return false;
    if(data.fullDescription === "") return false;
    if(data.price <= 0) return false;
    if(data.files.length === 0) return false;

    return true;
}


/***************************
 * Other Components
 */

type ButtonImagePropsType = {
    file: File;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

type ButtonImageType = FunctionComponent<ButtonImagePropsType>;


const ButtonImage:ButtonImageType = ({file, onClick}) => {
    


    return (
        <button className={styles.buttonImage}
            onClick={onClick}
            >
            <Image 
                src={URL.createObjectURL(file)} 
                alt={file.name}
                fill
                style={{
                    objectFit: 'cover'
                }}
                />
            <div className={styles.buttonImage_overlay}>
                <CloseIconSVG />
            </div>
        </button>
    );
}



