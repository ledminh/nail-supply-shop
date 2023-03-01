import { useState, useContext, MouseEventHandler, useEffect } from "react";

import { _ProductType } from "../../../../../types";

import { AdminContext } from "../../../../../Context";
import {setIsEditingImagesProduct} from '../../../../../reducer/actions.Products';

import {setProductImagesOnCache, getProductImagesFromCache, deleteAllProductImagesOnCache} from '../../../../../reducer/actions.Cache';

type useSingleEditParams = {
    data: _ProductType;
    setEditMode: (mode:boolean) => void;
}

const useSingleEdit = ({data, setEditMode}: useSingleEditParams) => {
    
    const {openProductImagesModal, dispatch, state} = useContext(AdminContext);

    const [productName, setProductName] = useState(data.name);
    const [id, setId] = useState(data.id);
    const [shortDescription, setShortDescription] = useState(data.shortDescription);
    const [fullDescription, setFullDescription] = useState(data.fullDescription);
    const [price, setPrice] = useState(data.price);

    const [images, setImages] = useState(data.images);
    const [prevImages, setPrevImages] = useState(data.images);


    const reset = () => {
        setProductName(data.name);
        setId(data.id);
        setShortDescription(data.shortDescription);
        setFullDescription(data.fullDescription);
        setPrice(data.price);
        setImages(data.images);
    }

    useEffect(() => {
        const cachedImages = getProductImagesFromCache(data.id, state);

        if(cachedImages) {
            setImages(cachedImages.map(image => {
                if(image instanceof File) {
                    return {
                        url: URL.createObjectURL(image),
                    };
                }
                else {
                    return image;
                }
            }));
        }
        else {
            setImages(prevImages);
        }


    }, [state.cache.productImages])

    /*****************************
     * Public methods
     */
    const onProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductName(e.target.value);
    }

    const onIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setId(e.target.value);
    }

    const onShortDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShortDescription(e.target.value);
    }

    const onFullDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFullDescription(e.target.value);
    }

    const onPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(Number(e.target.value));
    }

    const onEditImages:MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        setIsEditingImagesProduct(data.id, true, dispatch);
        setProductImagesOnCache(data.id, images, dispatch);
        setPrevImages(images);

        openProductImagesModal();

    }
    const onSave = () => {
        console.log('Save');
    }

    const onCancel = () => {
        setEditMode(false);
        deleteAllProductImagesOnCache(data.id, dispatch);

        reset();
    }


    return {
        productName,
        onProductNameChange,
        images,
        id,
        onIdChange,
        shortDescription,
        onShortDescriptionChange,
        fullDescription,
        onFullDescriptionChange,
        price,
        onPriceChange,
        onEditImages,
        onSave,
        onCancel
    }
}

export default useSingleEdit;