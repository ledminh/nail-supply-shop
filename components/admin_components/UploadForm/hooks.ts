import { useState, ChangeEvent } from 'react';

import axios from 'axios';
import { DeleteFileOptions } from '../../../types';

type useUploadParamsType = {onFileChange: (fileName:string|null) => void}; 

const useUpload= ({onFileChange}:useUploadParamsType) => {
    
    const [currentProgress, _setCurrentProgress] = useState<null|number>(null);
    const [fileName, _setFileName] = useState<string|null>(null);


    
    /***************************
     *  Public functions
     */
    const _onFileChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) {
            return;
        }

        const config = {
            headers: { 'content-type': 'multipart/form-data' },
            onUploadProgress: (event:any) => {

                _setCurrentProgress(Math.round((event.loaded * 100) / event.total));
            },
        };

        const formData = new FormData();
        formData.append('cat-image', event.target.files[0]);

        _setFileName(event.target.files[0].name);

        axios.post('/api/upload', formData, config)
            .then((res) => {
                // display uploaded image
                onFileChange(res.data.filename);
            })
            .catch(err => {
                throw err;
            })
    };

    const _onDeleteFileHandler = () => {
        if(currentProgress === 100 && fileName) {
            const option:DeleteFileOptions = {
                fileName,
                type: 'cat-image',
            } 

            
            axios.post('/api/delete', 
                    option,
                    { headers: {'content-type': 'application/json'}}
                    )
                    .then((res) => {
                        _setCurrentProgress(null);
                        _setFileName(null);
                        onFileChange(null);
                    })
                    .catch((err:Error) => {
                        throw err;
                    });
        }
    };

    return {
        currentProgress,
        fileName,
        _onFileChangeHandler,
        _onDeleteFileHandler,
    }
}

export default useUpload;