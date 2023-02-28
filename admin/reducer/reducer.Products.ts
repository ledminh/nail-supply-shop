import { _ProductType, _ProductGroupType } from "../types";
import { ActionType } from "./types";

const productsReducer = (state:(_ProductType|_ProductGroupType)[], action:ActionType) => {
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
                if(Array.isArray(product)) {
                    return product.map(product => {

                        return {
                            ...product,
                            newest: false
                        }
                    });
                }

                return {
                    ...product,
                    newest: false
                }
            });

            return [newestProduct, ...newState];
        case 'PROD/ADD_GROUP':
            const newestProductGroup = action.payload.map(product => {
                return {
                    ...product,
                    new: true,
                    newest: true
                }
            });


            const newStateGroup = state.map(product => {
                if(Array.isArray(product)) {
                    return product.map(product => {

                        return {
                            ...product,
                            newest: false
                        }
                    });
                }


                return {
                    ...product,
                    newest: false
                }
            });

            return [newestProductGroup, ...newStateGroup];
        default:
            return state;
    }
}

export default productsReducer;