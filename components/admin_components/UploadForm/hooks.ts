import { useState, ChangeEvent, useEffect } from 'react';

import axios from 'axios';
import { DeleteFileOptions } from '../../../types';



type useUploadParamsType = {fileName: string|null, setImgPath: (imgPath:string|null) => void, setFileName: (fileName:string|null) => void}; 

const useUpload= ({fileName, setImgPath, setFileName}:useUploadParamsType) => {
    
    const [currentProgress, _setCurrentProgress] = useState<null|number>(null);
    
    
    useEffect(() => {
        if(fileName === null) {
            _setCurrentProgress(null);
        }
    }, [fileName]);

    /***************************
     *  Public functions
     */
    const _onFileChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) {
            setImgPath(null);
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

        setFileName(event.target.files[0].name);

        axios.post('/api/upload', formData, config)
            .then((res) => {
                // display uploaded image
                setImgPath(`/images/category/${res.data.filename}`);   
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
                        setFileName(null);
                        setImgPath(null);
                    })
                    .catch((err:Error) => {
                        throw err;
                    });
        }
    };

    return {
        fileName,
        currentProgress,
        _onFileChangeHandler,
        _onDeleteFileHandler,
    }
}

export default useUpload;