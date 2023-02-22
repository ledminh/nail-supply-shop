import {MouseEvent} from 'react';


import { useState, ChangeEvent } from 'react';

type useUploadParamsType = {
    onFileChange: (file:File|null) => void;
}; 

const useUpload= ({onFileChange}:useUploadParamsType) => {
    
    const [file, setFile] = useState<File|null>(null);
    

    /***************************
     *  Private functions
     */


    const reset = () => {
        setFile(null);
        onFileChange(null);
    }

    /***************************
     *  Public functions
     */
    const _onFileChange = (event:ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) {
            reset();
            return;
        }

        const file = event.target.files[0];
        
        setFile(file);
        onFileChange(file);
        
        
    };

    const onDelete = (e: MouseEvent) => {
        e.preventDefault();

        if(file) {
            reset();
        }
    };

    return {
        fileName: file?.name || '',
        _onFileChange,
        onDelete,
    }
}

export default useUpload;