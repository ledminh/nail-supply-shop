import {MouseEvent} from 'react';


import { useState, ChangeEvent } from 'react';

import upload from '../../tools/upload';
import deleteFile from '../../tools/deleteFile';

type useUploadParamsType = {
    onImgPathChange: (imgPath:string|null) => void, 
}; 

const useUpload= ({onImgPathChange}:useUploadParamsType) => {
    
    const [currentProgress, setCurrentProgress] = useState<null|number>(null);
    const [fileName, setFileName] = useState<null|string>(null);
    

    /***************************
     *  Private functions
     */
    const onUploadProgress = (event:any) => {
        setCurrentProgress(Math.round((event.loaded * 100) / event.total));
    };


    const reset = () => {
        setCurrentProgress(null);
        setFileName(null);
        onImgPathChange(null);
    }

    /***************************
     *  Public functions
     */
    const onFileChange = (event:ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) {
            reset();
            return;
        }

        const file = event.target.files[0];
        
        setFileName(file.name);

        upload({type: 'cat-image', file, onUploadProgress})
            .then((res:any) => {
                onImgPathChange(`/images/category/${res.data.filename}`);
            });
        
    };

    const onDelete = (e: MouseEvent) => {
        e.preventDefault();

        if(fileName) {
            deleteFile({type: 'cat-image', fileName})
                .then(reset);
        }
    };

    return {
        fileName,
        currentProgress,
        onFileChange,
        onDelete,
    }
}

export default useUpload;