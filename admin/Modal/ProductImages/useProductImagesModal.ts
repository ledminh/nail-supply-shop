import {useEffect, useState, useContext, ChangeEvent} from 'react';
import {AdminContext} from '../../Context';

import {deleteCategoryImageOnCache, setCategoryImageOnCache, getProductImagesFromCache, deleteAllProductImagesOnCache } from '../../reducer/actions.Cache';

import { getEditingImagesProductID, resetIsEditingImagesProduct } from '../../reducer/actions.Products';


const useProductImages = () => {
    const {
        isProductImagesModalOpened, 
        closeProductImagesModal, 
        state, 
        dispatch
    } = useContext(AdminContext);

    const [currentProductID, setCurrentProductID] = useState<string | undefined>(undefined);

    const [images, setImages] = useState<((File|{url:string; alt?: string})[]) | undefined>(undefined);


    useEffect(() => {
        const productID = getEditingImagesProductID(state);
        
        if(!productID) {
            return;
        }

        setCurrentProductID(productID);
        const images = getProductImagesFromCache(productID, state);    

        setImages(images);
    }, [state.products]);
    



    // /**************************
    //  * Public API
    //  */

    const onDelete = () => {

        //if(currentProductID)
            // TODO deleteCategoryImageOnCache(currentProductID, dispatch);
    }

    const onCancel = () => {
        closeProductImagesModal();
        
        if(currentProductID)
            deleteAllProductImagesOnCache(currentProductID, dispatch);
        
        resetIsEditingImagesProduct(dispatch);
    }

    const onOK = () => {
        if(!currentProductID)
            return;


        closeProductImagesModal();
        
        resetIsEditingImagesProduct(dispatch);
        deleteAllProductImagesOnCache(currentProductID, dispatch);    
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
        images,
        onDelete,
        onOK,
        onCancel,
    } 

}

export default useProductImages;