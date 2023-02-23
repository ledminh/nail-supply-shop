import {useContext, ChangeEvent} from 'react';
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

    const currentCatID = getEditingImageCategoryID(state);

    
    // /**************************
    //  * Public API
    //  */

    const onDelete = () => {

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

        if(file) {
            
            if(currentCatID)
                setCategoryImageOnCache(currentCatID, file, dispatch);
        }
        else {
            
            if(currentCatID)
                deleteCategoryImageOnCache(currentCatID, dispatch);
        }

    } 



    return {
        shown: isCatImageModalOpened,
        onFileChange,
        // file === undefined might mean no file is cached or no currentCat is opened. But  no currentCat is opened is impossible, because before opening the modal, currentCat must be set on Edit/Item/EditScreen
        // file === File means a file is selected
        file: currentCatID? getCategoryImageFromCache(currentCatID, state): undefined,
        onDelete,
        onOK,
        onCancel,
    } 

}

export default useCatImage;