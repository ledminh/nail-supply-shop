import { FunctionComponent, ChangeEvent, useState } from "react";

import styles from './UploadForm.module.scss';

import useUpload from "./hooks";

/***************************
 *  Types
 */
interface UploadFormPropsType {
    id: string;
    inputClassName?: string;
    allowMultipleFiles?: boolean;
    setImgPath: (imgPath: string|null) => void;
    setFileName: (fileName: string|null) => void;
    fileName: string|null;
} 

type UploadFormType = FunctionComponent<UploadFormPropsType>



/***************************
 *  Main Component
 */
const UploadForm:UploadFormType = ({id, inputClassName, allowMultipleFiles, setImgPath, fileName, setFileName}) => {
    const {currentProgress, _onFileChangeHandler, _onDeleteFileHandler} = useUpload({fileName, setImgPath, setFileName});

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
                    {
                        fileName? <div className={styles.fileName}>{fileName.length < 20? fileName: "... " + fileName.substring(fileName.length - 20)}</div>: null 
                    }
                    
                </div>
                <button className={styles.cancelButton} 
                    onClick={(e) => {
                        e.preventDefault();
                        _onDeleteFileHandler()
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
            accept="image/*"
            id={id}
            className={inputClassName}
            onChange={_onFileChangeHandler}
            multiple={allowMultipleFiles}
        />
    );
}

export default UploadForm;

