import { ProductGroupType, ProductType } from "../../database";

import { ProductToAdd, _ProductType } from "../types";
import { ActionType } from "./types";

import convertProduct from "../tools/convertProduct";
import postProduct from "../tools/postProduct";


const _convertBoth = (data: ProductType|ProductGroupType): _ProductType|ProductGroupType => {

    if(Array.isArray(data)){
        return data;
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