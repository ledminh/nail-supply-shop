import {MouseEvent} from 'react';


import { useState, ChangeEvent } from 'react';

import upload from '../../tools/upload';
import deleteFile from '../../tools/deleteFile';

type useUploadParamsType = {
    onImgPathChange: (imgPath:string|null) => void, 
}; 

const useUpload= ({onImgPathChange}:useUploadParamsType) => {
    
    const [fileName, setFileName] = useState<null|string>(null);
    

    /***************************
     *  Private functions
     */


    const reset = () => {
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

        upload({type: 'cat-image', file})
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
        onFileChange,
        onDelete,
    }
}

export default useUpload;