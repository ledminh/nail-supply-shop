import { useState, useEffect, useContext, MouseEventHandler } from 'react';
import { ProductImageType } from '../../../../../../../database';

import { AdminContext } from '../../../../../../Context';
import {setIsEditingImagesProduct, updateProduct} from '../../../../../../reducer/actions.Products';
import {setProductImagesOnCache, getProductImagesFromCache, deleteAllProductImagesOnCache} from '../../../../../../reducer/actions.Cache';

type Props = {
    initImages: (ProductImageType|File)[];
    productID: string;
}

const useImages = ({initImages, productID}: Props) => {

    const {openProductImagesModal, dispatch, state} = useContext(AdminContext);

    const [images, setImages] = useState<(ProductImageType|File)[]>(initImages);
    const [prevImages, setPrevImages] = useState<(ProductImageType|File)[]>(initImages);

    useEffect(() => {
        const cachedImages = getProductImagesFromCache(productID, state);

        if(cachedImages) {
            setImages(cachedImages);
        }
        else {
            setImages(prevImages);
        }        


    }, [state.cache.productImages]);

    /***********************
     * Public methods
     */


    const onEditImages:MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        setIsEditingImagesProduct(productID, true, dispatch);
        setProductImagesOnCache(productID, images, dispatch);
        setPrevImages(images);

        openProductImagesModal();

    }

    // called on cancel, thus it should reset the images to the state before the user started editing
    const resetImages = () => {
        setImages(initImages);
        setPrevImages(initImages);
    }

    const getImagesToUpload = () => {
        return images.filter(image => image instanceof File) as File[];
    }

    const getImagesToDelete = () => {
        const imagesToDelete = prevImages.filter(image => !(images.includes(image))) as ProductImageType[];

        

        return imagesToDelete;
    }

    return {
        images,
        prevImages,
        onEditImages,
        resetImages,
        getImagesToUpload,
        getImagesToDelete
    }
}

export default useImages;