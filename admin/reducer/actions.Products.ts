import { ProductGroupType, ProductType } from "../../database";

import { ProductGroupToAdd, ProductToAdd, _ProductType, _ProductGroupType } from "../types";
import { ActionType, StateType } from "./types";

import convertProduct from "../tools/convertProduct";
import convertGroupProduct from "../tools/convertGroupProduct";

import postProduct from "../tools/postProduct";
import postProductGroup from "../tools/postProductGroup";


const _convertBoth = (data: ProductType|ProductGroupType): _ProductType|_ProductGroupType => {

    if(Array.isArray(data)){
        return convertGroupProduct(data);
    }

    return convertProduct(data);

}


export const setProducts = (products:(ProductType|ProductGroupType)[], dispatch: React.Dispatch<ActionType>) => {
    dispatch({
        type: 'PROD/SET',
        payload: products.map(_convertBoth)
    });
}

export const addProduct = (
    productToAdd:ProductToAdd, 
    dispatch: React.Dispatch<ActionType>) => {
    
    postProduct({
        type: 'add',
        data: productToAdd,
        onSuccess: (newProduct) => {
            if(newProduct){
                dispatch({
                    type: 'PROD/ADD_SINGLE',
                    payload: convertProduct(newProduct)
                });
            }
        }
    });

}

export const updateProduct = (
    updatedProduct:ProductType,
    dispatch: React.Dispatch<ActionType>) => {

    dispatch({
        type: 'PROD/UPDATE_SINGLE',
        payload: convertProduct(updatedProduct)
    });
}

export const addProductGroup = (
    productGroupToAdd: ProductGroupToAdd,
    dispatch: React.Dispatch<ActionType>) => {

    postProductGroup({
        type: 'add',
        data: productGroupToAdd,
        onSuccess: (newProductGroup) => {
            if(newProductGroup){
                
                dispatch({
                    type: 'PROD/ADD_GROUP',
                    payload: convertGroupProduct(newProductGroup)
                });
            }
        }
    });

}


export const getProductsByCategoryID = (categoryID:string, state:StateType) => {
    return state.products.filter(prod => 
        {
            if(Array.isArray(prod)){
                return prod[0].categoryID === categoryID;
            }
            return prod.categoryID === categoryID;
    
    });
}

export const setIsEditingImagesProduct = (productID:string, isEditingImages:boolean, dispatch: React.Dispatch<ActionType>) => {
    dispatch({
        type: 'PROD/SET_IS_EDITING_IMAGES',
        payload: {
            productID,
            isEditingImages
        }
    });
}

export const resetIsEditingImagesProduct = (dispatch: React.Dispatch<ActionType>) => {
    dispatch({
        type: 'PROD/RESET_IS_EDITING_IMAGES'
    });

}

export const getEditingImagesProductID = (state:StateType) => {

    const editingImagesProduct = state.products.find(prod => {
        if(Array.isArray(prod)){
            const editingImagesProduct = prod.find(p => p.isEditingImages);

            if(editingImagesProduct){
                return editingImagesProduct.isEditingImages;
            }
            else {
                return false;
            }
        }
        else {


            return prod.isEditingImages;
        }


    });

    
    if(Array.isArray(editingImagesProduct)){
        return editingImagesProduct.find(p => p.isEditingImages)?.id;
    }
    else {
        return editingImagesProduct?.id;
    }


    
}