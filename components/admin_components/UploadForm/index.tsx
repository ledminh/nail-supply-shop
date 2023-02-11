import { FunctionComponent, ChangeEvent, useState } from "react";

import styles from './UploadForm.module.scss';

import axios from 'axios';
import { DeleteFileOptions } from "../../../types";
import useUpload from "./hooks";

/***************************
 *  Types
 */
interface UploadFormPropsType {
    id: string;
    inputClassName?: string;
    allowMultipleFiles?: boolean;
} 

type UploadFormType = FunctionComponent<UploadFormPropsType>



/***************************
 *  Main Component
 */
const UploadForm:UploadFormType = ({id, inputClassName, allowMultipleFiles}) => {
    const {currentProgress, fileName, onFileChangeHandler, onDeleteFileHandler} = useUpload();

    // Show progress bar if there is a progress
    if (currentProgress) {
        return (
            <div className={styles.wrapper + ' '  + inputClassName}>
                <div className={styles.progressBar} style={{
                    padding: '0',
                    position: 'relative',
                    overflow: 'hidden'
                    
                }}>
                    <div className={styles.progress} style={{
                        width: `${currentProgress}%`
                    }}/>
                    <div className={styles.fileName}>{fileName}</div>
                </div>
                <button className={styles.cancelButton} 
                    onClick={(e) => {
                        e.preventDefault();
                        onDeleteFileHandler()
                    }}
                    disabled={currentProgress < 100}
                    >
                    Delete
                </button>
            </div>
        );
    }

    return (
        <input type="file" 
            name="cat-image"
            id={id}
            className={inputClassName}
            onChange={onFileChangeHandler}
            multiple={allowMultipleFiles}
        />
    );
}

export default UploadForm;

