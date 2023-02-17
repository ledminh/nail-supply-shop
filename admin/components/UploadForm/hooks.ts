import {MouseEvent} from 'react';


import { useState, ChangeEvent } from 'react';

import upload from '../../tools/upload';
import deleteFile from '../../tools/deleteFile';

type useUploadParamsType = {fileName: string|null, setImgPath: (imgPath:string|null) => void, setFileName: (fileName:string|null) => void}; 

const useUpload= ({fileName, setImgPath, setFileName}:useUploadParamsType) => {
    
    const [currentProgress, setCurrentProgress] = useState<null|number>(null);
    
    

    /***************************
     *  Private functions
     */
    const onUploadProgress = (event:any) => {
        setCurrentProgress(Math.round((event.loaded * 100) / event.total));
    };


    /***************************
     *  Public functions
     */
    const onFileChange = (event:ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) {
            setImgPath(null);
            return;
        }

        const file = event.target.files[0];
        
        setFileName(file.name);

        upload({type: 'cat-image', file, onUploadProgress})
            .then((res:any) => {
                setImgPath(`/images/category/${res.data.filename}`);
            });
        
    };

    const onDelete = (e: MouseEvent) => {
        e.preventDefault();

        if(fileName) {
            deleteFile({type: 'cat-image', fileName})
                .then(() => {
                    setCurrentProgress(null);
                    setFileName(null);
                    setImgPath(null);
                })
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