import { useState, ChangeEvent } from 'react';

import axios from 'axios';
import { DeleteFileOptions } from '../../../types';

const useUpload = () => {
    
    const [currentProgress, setCurrentProgress] = useState<null|number>(null);
    const [fileName, setFileName] = useState<string|null>(null);




    
    /***************************
     *  Public functions
     */
    const onFileChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
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

        setFileName(event.target.files[0].name);

        axios.post('/api/upload', formData, config)
            .then(res => {
                console.log(res.data.path);
            })
            .catch(err => {
                console.log(err);
            })
    };

    const onDeleteFileHandler = () => {
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
                        setCurrentProgress(null);
                        setFileName(null);
                    })
                    .catch((err:Error) => {
                        throw err;
                    });
        }
    };

    return {
        currentProgress,
        fileName,
        onFileChangeHandler,
        onDeleteFileHandler,
    }
}

export default useUpload;