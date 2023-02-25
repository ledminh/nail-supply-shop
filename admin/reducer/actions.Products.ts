import { ProductGroupType, ProductType } from "../../database";

import { ProductToAdd, _ProductType } from "../types";
import { ActionType, StateType } from "./types";

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

export const getProductsByCategoryID = (categoryID:string, state:StateType) => {
    return state.products.filter(prod => 
        {
            if(Array.isArray(prod)){
                return prod[0].categoryID === categoryID;
            }
            return prod.categoryID === categoryID;
    
    });
}