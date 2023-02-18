import { ProductGroupType, ProductType } from "../../database";
import { ActionType } from "./types";

const productsReducer = (state:(ProductType|ProductGroupType)[], action:ActionType) => {
    switch(action.type) {
        case 'PROD/SET':
            return action.payload;
        default:
            return state;
    }
}

export default productsReducer;