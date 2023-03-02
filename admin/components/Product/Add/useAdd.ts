import { useContext, useState, MouseEventHandler } from 'react';
import { AdminContext } from '../../../Context';
import upload from '../../../tools/upload';

import { SingleAddData } from './SingleAdd';

import { ProductToAdd, ProductGroupToAdd } from '../../../types';
import { addProduct, addProductGroup } from '../../../reducer/actions.Products';
import { GroupAddData } from './GroupAdd';

import postProduct from '../../../tools/postProduct';
import postProductGroup from '../../../tools/postProductGroup';


const useAdd = () => {

    const {dispatch} = useContext(AdminContext);

    const [currentMode, setMode] = useState<'single'|'group'>('single');
    const [isDataValid, setIsDataValid] = useState<boolean>(false);    

    const [isResetting, setIsResetting] = useState<boolean>(false);

    const [singleProduct, setSingleProduct] = useState<SingleAddData|null>(null);
    const [groupAddData, setGroupAddData] = useState<GroupAddData|null>(null);



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
                const productToAdd:ProductToAdd = {
                    categoryID: singleProduct.categoryID,
                    name: singleProduct.productName,
                    id: singleProduct.id,
                    shortDescription: singleProduct.shortDescription,
                    fullDescription: singleProduct.fullDescription,
                    price: singleProduct.price,
                    imageUrls,
                };

                postProduct({
                    type: 'add',
                    data: productToAdd,
                    onSuccess: (newProduct) => {
                        if(newProduct){
                            addProduct(newProduct, dispatch);
                        }
                    }
                });


                setIsResetting(true);                

            }).catch((err) => {
                throw new Error(err);
            });

            

        }
        else if (currentMode === 'group') {
            const productGroupToAdd:ProductGroupToAdd= [];

            if(!groupAddData) return;

            groupAddData.products.map((product) => {
                
                upload({
                    type: 'product-images',
                    files: product.files,
                    }).then(({data}) => {

                        const {filenames} = data;

                        const imageUrls = filenames.map((filename:string) => `/images/product/${filename}`);

                        productGroupToAdd.push({
                            categoryID: groupAddData.categoryID,
                            name: groupAddData.groupName,
                            variantName: product.variantName,
                            mainProduct: product.mainProduct,
                            id: product.id,
                            shortDescription: product.shortDescription,
                            fullDescription: product.fullDescription,
                            price: product.price,
                            imageUrls,
                        });

                        if(productGroupToAdd.length === groupAddData.products.length) {

                            postProductGroup({
                                type: 'add',
                                data: productGroupToAdd,
                                onSuccess: (newProductGroup) => {
                                    if(newProductGroup){
                                        addProductGroup(newProductGroup, dispatch);
                        
                                    }
                                }
                            });

                            setIsResetting(true);
                        }

                    }).catch((err) => {
                        throw new Error(err);
                    });



            
            })                



        }

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

    const onGroupAddDataChange = (groupAddData: GroupAddData) => {
        
        setGroupAddData(groupAddData);
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
        onProductChange,
        onGroupAddDataChange,
    }
}

export default useAdd;