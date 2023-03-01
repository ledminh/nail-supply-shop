import {useEffect, useState, useContext, ChangeEvent, MouseEventHandler} from 'react';
import {AdminContext} from '../../Context';

import {deleteCategoryImageOnCache, setCategoryImageOnCache, getCategoryImageFromCache } from '../../reducer/actions.Cache';

import { getEditingImageCategoryID, resetIsEditingImageCategory } from '../../reducer/actions.Categories';


const useCatImage = () => {
    const {
        isCatImageModalOpened, 
        closeCatImageModal, 
        state, 
        dispatch
    } = useContext(AdminContext);

    const [currentCatID, setCurrentCatID] = useState<string | undefined>(undefined);
    const [image, setImage] = useState<File | string | undefined>(undefined);

    useEffect(() => {
        const catID = getEditingImageCategoryID(state);

        if(!catID) {
            return;
        }

        setCurrentCatID(catID);
        const image = getCategoryImageFromCache(catID, state);

        setImage(image);

    }, [state.categories, state.cache]);
    
    // /**************************
    //  * Public API
    //  */

    const onDelete:MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        
        if(currentCatID)
            deleteCategoryImageOnCache(currentCatID, dispatch);
    }

    const onCancel = () => {
        closeCatImageModal();
        
        if(currentCatID)
            deleteCategoryImageOnCache(currentCatID, dispatch);
        
        resetIsEditingImageCategory(dispatch);
    }

    const onOK = () => {
        closeCatImageModal();
        resetIsEditingImageCategory(dispatch);    
    }

    const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];

        if(file && currentCatID) {
            setCategoryImageOnCache(currentCatID, file, dispatch);            
                
        }

    } 



    return {
        shown: isCatImageModalOpened,
        onFileChange,
        image,
        onDelete,
        onOK,
        onCancel,
    } 

}

export default useCatImage;