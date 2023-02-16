import {useContext, ChangeEvent} from 'react';
import ModalContext from './../Context/ModalContext';

import {useState} from 'react';

const useCatImage = () => {
    const {isCatImageShown, setCatImageShow} = useContext(ModalContext);

    const [imageUrl, setImageUrl] = useState<string|null>(null);



    /**************************
     * Public API
     */
    const shown = isCatImageShown;
    const setShown = setCatImageShow;



    const handleOnFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if(!event.target.files) {
            setImageUrl(null);
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
                }
            }
        }
    };


    return {
        shown,
        setShown,
        imageUrl,
        handleOnFileChange
    } 

}

export default useCatImage;