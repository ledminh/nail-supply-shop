import { ProductGroupType } from "../../database";
import { _ProductType } from "../types";
import { ActionType } from "./types";

const productsReducer = (state:(_ProductType|ProductGroupType)[], action:ActionType) => {
    switch(action.type) {
        case 'PROD/SET':
            return action.payload;
        case 'PROD/ADD_SINGLE':
            const newestProduct = {
                ...action.payload,
                new: true,
                newest: true
            } 

            const newState = state.map(product => {
                return {
                    ...product,
                    newest: false
                }
            });

            return [newestProduct, ...newState];
        
        default:
            return state;
    }
}

export default productsReducer;