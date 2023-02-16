import {useContext, ChangeEvent} from 'react';
import ModalContext from './../Context/ModalContext';

import {useState} from 'react';

const useCatImage = () => {
    const {isCatImageShown, setCatImageShow} = useContext(ModalContext);

    const [imageUrl, setImageUrl] = useState<string|null>(null);
    const [fileName, setFileName] = useState<string|null>(null);

    

    /**************************
     * Public API
     */
    const shown = isCatImageShown;
    const setShown = setCatImageShow;

    const reset = () => {
        setImageUrl(null);
        setFileName(null);
    }

    const handleOnFileChange = (event: ChangeEvent<HTMLInputElement>) => {
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
                    // these two functions are always called together
                    setFileName(file.name);
                    setImageUrl(image.toString());
                }
            }
        }
    };


    return {
        shown,
        setShown,
        reset,
        fileName,
        imageUrl,
        handleOnFileChange
    } 

}

export default useCatImage;