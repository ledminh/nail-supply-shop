import {MouseEvent} from 'react';


import { useState, ChangeEvent } from 'react';

type useUploadParamsType = {
    file: File | null,
    setFile: (file: File | null) => void,
}; 

const useUpload= ({file, setFile}:useUploadParamsType) => {
    
    

    /***************************
     *  Private functions
     */


    /***************************
     *  Public functions
     */
    const onFileChange = (event:ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) {
            setFile(null);
            return;
        }

        const file = event.target.files[0];
        
        setFile(file);
        
        
    };

    const onDelete = (e: MouseEvent) => {
        e.preventDefault();

        if(file) {
            setFile(null);
        }
    };

    return {
        file,
        onFileChange,
        onDelete,
    }
}

export default useUpload;