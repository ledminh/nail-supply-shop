import {useEffect, useState, useContext, ChangeEvent} from 'react';
import {AdminContext} from '../../Context';

import {deleteCategoryImageOnCache, setCategoryImageOnCache, getProductImagesFromCache } from '../../reducer/actions.Cache';

import { getEditingImageCategoryID, resetIsEditingImageCategory } from '../../reducer/actions.Categories';
import { getEditingImagesProductID } from '../../reducer/actions.Products';


const useProductImages = () => {
    const {
        isProductImagesModalOpened, 
        closeProductImagesModal, 
        state, 
        dispatch
    } = useContext(AdminContext);

    const [currentProductID, setCurrentProductID] = useState<string | undefined>(undefined);
    const [files, setFiles] = useState<((File|{url:string; alt?: string})[]) | undefined>(undefined);


    useEffect(() => {
        const productID = getEditingImagesProductID(state);
        
        if(!productID) {
            return;
        }

        setCurrentProductID(productID);
        const files = getProductImagesFromCache(productID, state);    

        setFiles(files);
    }, [state.products]);
    



    // /**************************
    //  * Public API
    //  */

    const onDelete = () => {

        if(currentProductID)
            deleteCategoryImageOnCache(currentProductID, dispatch);
    }

    const onCancel = () => {
        closeProductImagesModal();
        
        if(currentProductID)
            deleteCategoryImageOnCache(currentProductID, dispatch);
        
        resetIsEditingImageCategory(dispatch);
    }

    const onOK = () => {
        closeProductImagesModal();
        resetIsEditingImageCategory(dispatch);    
    }

    const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];

        if(file) {
            
            if(currentProductID)
                setCategoryImageOnCache(currentProductID, file, dispatch);
        }
        else {
            
            if(currentProductID)
                deleteCategoryImageOnCache(currentProductID, dispatch);
        }

    } 



    return {
        shown: isProductImagesModalOpened,
        onFileChange,
        files,
        onDelete,
        onOK,
        onCancel,
    } 

}

export default useProductImages;