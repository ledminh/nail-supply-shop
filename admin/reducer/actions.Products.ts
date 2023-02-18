import { ProductGroupType, ProductType } from "../../database";
import { ActionType } from "./types";

export const setProducts = (products:(ProductType|ProductGroupType)[], dispatch: React.Dispatch<ActionType>) => {
    dispatch({
        type: 'PROD/SET',
        payload: products
    });
}