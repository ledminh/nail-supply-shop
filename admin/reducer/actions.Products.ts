import { ProductGroupType, ProductType } from "../../database";
import { ProductToAdd } from "../types";
import { ActionType } from "./types";

import postProduct from "../tools/postProduct";

export const setProducts = (products:(ProductType|ProductGroupType)[], dispatch: React.Dispatch<ActionType>) => {
    dispatch({
        type: 'PROD/SET',
        payload: products
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
                    payload: newProduct
                });
            }
        }
    });
}