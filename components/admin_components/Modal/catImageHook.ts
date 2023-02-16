import {useContext, ChangeEvent} from 'react';
import AdminContext from '../Context/AdminContext';

import {useState} from 'react';

type useCatImageParamsType = {
};

const useCatImage = () => {
    const {isCatImageModalShown, setCatImageModalShow} = useContext(AdminContext);

    const [imageUrl, setImageUrl] = useState<string|null>(null);
    const [file, setFile] = useState<File|null>(null);
    

    /**************************
     * Public API
     */
    const shown = isCatImageModalShown;
    const setShown = setCatImageModalShow;

    const reset = () => {
        setImageUrl(null);
        setFile(null);
    }

    const onCancel = () => {
        setShown(false);
        reset();
    }

    const onSave = () => {
        setShown(false);

   

    }

    const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if(!event.target.files) {
            
            reset();
            return;
        };
        
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();        
            reader.readAsDataURL(file);

            reader.onload = (e) => {
                const image = e.target?.result;
                if (image) {
                    setImageUrl(image.toString());
                    setFile(file);

                }
            }
        }
    };


    return {
        shown,
        setShown,
        reset,
        file,
        imageUrl,
        onFileChange,
        onCancel,
        onSave,
    } 

}

export default useCatImage;