import {useEffect, useState, useContext, ChangeEvent} from 'react';
import {AdminContext} from '../../Context';

import {deleteCategoryImageOnCache, setCategoryImageOnCache, getProductImagesFromCache, setProductImagesOnCache, deleteAllProductImagesOnCache } from '../../reducer/actions.Cache';

import { getEditingImagesProductID, resetIsEditingImagesProduct } from '../../reducer/actions.Products';


const useProductImages = () => {
    const {
        isProductImagesModalOpened, 
        closeProductImagesModal, 
        state, 
        dispatch
    } = useContext(AdminContext);

    const [currentProductID, setCurrentProductID] = useState<string | undefined>(undefined);

    const [images, setImages] = useState<((File|{url:string; alt?: string})[]) >([]);


    useEffect(() => {
        const productID = getEditingImagesProductID(state);
        
        if(!productID) {
            return;
        }

        setCurrentProductID(productID);
        const images = getProductImagesFromCache(productID, state);    

        setImages(images? images : []);
    }, [state.products]);
    

    useEffect(() => {
        if(!currentProductID) {
            return;
        }

        setProductImagesOnCache(currentProductID, images, dispatch);
    }, [images]);

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

        closeProductImagesModal();        
        resetIsEditingImagesProduct(dispatch);
    
    }

    const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if(!currentProductID) 
            return;


        const files = event.target.files;

        if(files) {
            const newImages = Array.from(files).map(file => file);
            setImages([...newImages, ...images]);

                
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