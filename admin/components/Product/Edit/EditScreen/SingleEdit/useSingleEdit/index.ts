import { useState, useContext, MouseEventHandler, useEffect } from "react";

import { _ProductType, ProductToUpdate } from "../../../../../../types";

import { ProductType } from "../../../../../../../database";

import { AdminContext } from "../../../../../../Context";
import {setIsEditingImagesProduct, updateProduct} from '../../../../../../reducer/actions.Products';

import {setProductImagesOnCache, getProductImagesFromCache, deleteAllProductImagesOnCache} from '../../../../../../reducer/actions.Cache';
import postProduct from "../../../../../../tools/postProduct";
import { ProductImageType } from "../../../../../../../database";

import upload from "../../../../../../tools/upload";
import deleteFile from "../../../../../../tools/deleteFile";

import useValues from "./useValues";
import useImages from "./useImages";

type useSingleEditParams = {
    data: _ProductType;
    setEditMode: (mode:boolean) => void;
}

const useSingleEdit = ({data, setEditMode}: useSingleEditParams) => {
    
    const {openProductImagesModal, dispatch, state} = useContext(AdminContext);

    
    const { productName, shortDescription, fullDescription, price, 
        resetValues, onProductNameChange, onShortDescriptionChange, onFullDescriptionChange, onPriceChange
    } = useValues({
        initProductName: data.name,
        initShortDescription: data.shortDescription,
        initFullDescription: data.fullDescription,
        initPrice: data.price,
    });

    const {
        images,
        prevImages,
        onEditImages,
        resetImages,
        getImagesToUpload,
        getImagesToDelete
    } = useImages({
        initImages: data.images,
        productID: data.id
    });
    



    const reset = () => {
        resetValues();
        resetImages();
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
                images: []
            }

            const imagesToUpload = getImagesToUpload();
            let preparedImages = images;

            if(imagesToUpload.length > 0) {
                
                const {data} = await upload({
                    type: 'product-images',
                    files: imagesToUpload,
                });

                const {filenames} = data;

                const imageUrls = filenames.map((filename: string) => `/images/product/${filename}`);

                preparedImages = images.map(image => {
                    if(image instanceof File) {
                        return {
                            url: imageUrls.shift() as string
                        }
                    }
                    else {
                        return {
                            url: image.url
                        }
                    }
                });
            }

            const imagesToDelete = getImagesToDelete();

            if(imagesToDelete.length > 0) {
                imagesToDelete.forEach(image => {
                    if(image.url.indexOf('/images/product/') === -1)  {
                        return;
                    }

                    deleteFile({
                        type: 'prod-image',
                        fileName: image.url.split('/').pop()!
                    })});                
            }

            preparedProd.images = preparedImages as ProductImageType[];

            return preparedProd;

        }
        catch(err) {
            throw err;
        }
    }



    



    /*****************************
     * Public methods
     */
    

    
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