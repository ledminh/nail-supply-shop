import { useState, useContext, MouseEventHandler, useEffect } from "react";

import { _ProductType, ProductToUpdate } from "../../../../../types";

import { ProductType } from "../../../../../../database";

import { AdminContext } from "../../../../../Context";
import {setIsEditingImagesProduct, updateProduct} from '../../../../../reducer/actions.Products';

import {setProductImagesOnCache, getProductImagesFromCache, deleteAllProductImagesOnCache} from '../../../../../reducer/actions.Cache';
import postProduct from "../../../../../tools/postProduct";
import { ProductImageType } from "../../../../../../database";

import upload from "../../../../../tools/upload";
import deleteFile from "../../../../../tools/deleteFile";

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

    const [images, setImages] = useState<(ProductImageType|File)[]>(data.images);
    const [prevImages, setPrevImages] = useState<(ProductImageType|File)[]>(data.images);


    const reset = () => {
        setProductName(data.name);
        setId(data.id);
        setShortDescription(data.shortDescription);
        setFullDescription(data.fullDescription);
        setPrice(data.price);
        setImages(data.images);
    }


    const prepareProduct = async () => {
        try {

            let preparedProd:ProductToUpdate = {
                categoryID: data.categoryID,
                id: data.id,
                name: productName,
                shortDescription,
                fullDescription,
                price,
                imageUrls: []
            }


            if(images.some(image => image instanceof File)) {
                const imagesToUpload = images.filter(image => image instanceof File);
                
                const {data} = await upload({
                    type: 'product-images',
                    files: imagesToUpload as File[],
                });

                const {filenames} = data;

                const imageUrls = filenames.map((filename: string) => `/images/product/${filename}`);

                preparedProd.imageUrls = images.map(image => {
                    if(image instanceof File) {
                        return imageUrls.shift();
                    }
                    else {
                        return image.url;
                    }
                });
            }

            const imagesToDelete = data.images.filter(image => !images.includes(image)).filter(image => image.url.indexOf('/images/product') !== -1);

            if(imagesToDelete.length > 0) {
                imagesToDelete.forEach(image => {
                    deleteFile({
                        type: 'prod-image',
                        fileName: image.url.split('/').pop()!
                    })});                
            }

            return preparedProd;

        }
        catch(err) {
            throw err;
        }
    }



    useEffect(() => {
        const cachedImages = getProductImagesFromCache(data.id, state);

        if(cachedImages) {
            setImages(cachedImages);
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
        prepareProduct()
            .then((preparedProduct) => {
                
                postProduct({
                    type: 'update',
                    data: preparedProduct,
                    onSuccess: (updatedProduct) => {
                        updateProduct(updatedProduct as ProductType, dispatch);
                        setEditMode(false);
                        deleteAllProductImagesOnCache(data.id, dispatch);
                    }
                })

            })
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