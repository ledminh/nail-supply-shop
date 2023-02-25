import { useContext, useState, MouseEventHandler } from 'react';
import { AdminContext } from '../../../Context';
import upload from '../../../tools/upload';

import { AddFormData } from './AddForm';
import { SingleAddData } from './SingleAdd';



const useAdd = () => {

    const [currentMode, setMode] = useState<'single'|'group'>('single');
    const [isDataValid, setIsDataValid] = useState<boolean>(false);    

    const [isResetting, setIsResetting] = useState<boolean>(false);

    const [singleProduct, setSingleProduct] = useState<SingleAddData|null>(null);
    



    /*************************************
     *  Public methods
     */
    

    const onAddClick:MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();



        if(currentMode === 'single') {
            if(!singleProduct) return;
        
            // upload images of product to server, get image urls
            upload({
                type: 'product-images',
                files: singleProduct.files,
            }).then(({data}) => {
                const {filenames} = data;
                const imageUrls = filenames.map((filename:string) => `/images/product/${filename}`);

                // add product to database
                const productToAdd = {
                    ...singleProduct,
                    imageUrls
                };

                // TODO: add product to database
                

            }).catch((err) => {
                console.log(err.message);
            });

            

        }


        // reset form



        setIsResetting(true);
    }

    const onCancelClick:MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();

        setIsResetting(true);    

    }

    const onSingleClick:MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        if(currentMode === 'single') return;
        
        setIsDataValid(false);
        setMode('single');
    }

    const onGroupClick:MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        
        if(currentMode === 'group') return;

        setIsDataValid(false);
        setMode('group');
    }


    const onProductChange = (productData: SingleAddData) => {
        setSingleProduct(productData);
    }
    
    return {
        currentMode,
        onSingleClick,
        onGroupClick,
        onAddClick,
        onCancelClick,
        isDataValid,
        setIsDataValid,
        isResetting,
        setIsResetting,
        onProductChange
    }
}

export default useAdd;