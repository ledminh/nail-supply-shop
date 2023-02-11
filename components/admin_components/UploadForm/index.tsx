import { FunctionComponent, ChangeEvent, useState } from "react";

import styles from './UploadForm.module.scss';

import axios from 'axios';

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

    const [currentProgress, setCurrentProgress] = useState(0);

    const onChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) {
            return;
        }

        const config = {
            headers: { 'content-type': 'multipart/form-data' },
            onUploadProgress: (event:any) => {

                setCurrentProgress(Math.round((event.loaded * 100) / event.total));
            },
        };

        const formData = new FormData();
        formData.append('cat-image', event.target.files[0]);
    
        axios.post('/api/upload', formData, config)
            .then(res => {
                console.log(res.data.path);
            })
            .catch(err => {
                console.log(err);
            })
    };

    return (
        <>
            <input type="file" 
                name="cat-image"
                id={id}
                className={inputClassName}
                onChange={onChangeHandler}
                multiple={allowMultipleFiles}
            />
            {currentProgress > 0 && <div className={styles.progress}>{currentProgress}%</div>}
        </>
    )
}

export default UploadForm;