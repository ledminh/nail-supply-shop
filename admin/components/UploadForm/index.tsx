import { FunctionComponent } from "react";

import styles from './UploadForm.module.scss';

import useUpload from "./useUpload";

/***************************
 *  Types
 */
interface UploadFormPropsType {
    id: string;
    inputClassName?: string;
    allowMultipleFiles?: boolean;
    onFileChange: (file:File|null) => void;
    
} 

type UploadFormType = FunctionComponent<UploadFormPropsType>



/***************************
 *  Main Component
 */
const UploadForm:UploadFormType = ({id, inputClassName, allowMultipleFiles, onFileChange}) => {
    const { _onFileChange, 
            onDelete, 
            file
        } = useUpload({onFileChange});

    // Show progress bar if there is a progress
    if (file) {
        return (
            <div className={styles.wrapper + ' '  + inputClassName}>
                <div className={styles.fileName}>
                    {
                        file.name.length < 20? file.name: "... " + file.name.substring(file.name.length - 20)
                    }         
                </div>
                <button className={styles.cancelButton} 
                    onClick={onDelete}
                    >
                    Delete
                </button>
            </div>
        );
    }

    return (
        <input type="file" 
            name="cat-image"
            accept="image/*"
            id={id}
            className={inputClassName}
            onChange={_onFileChange}
            multiple={allowMultipleFiles}
        />
    );
}

export default UploadForm;

