import { _CategoryType } from "../types";
import { ActionType } from "./types";



const categoriesReducer = (state:_CategoryType[], action:ActionType) => {
    switch(action.type) {
        case 'CAT/SET':
            return action.payload;

        case 'CAT/ADD':
            const newestCategory = {
                ...action.payload,
                new: true,
                newest: true
            }


            const newState = state.map(category => {
                return {
                    ...category,
                    newest: false
                }
            });

            return [newestCategory, ...newState];
        
        case 'CAT/SET_TO_BE_DELETED':
            return state.map(category => {
                if(category.id === action.payload) {
                    return {
                        ...category,
                        toBeDeleted: true
                    }
                } else {
                    return category;
                }
            });

        case 'CAT/DELETE':
            return state.filter(category => category.id !== action.payload);

        case 'CAT/SET_IS_EDITING_IMAGE':
            return state.map(category => {
                if(category.id === action.payload) {
                    return {
                        ...category,
                        isEditingImage: true
                    }
                } else {
                    return {
                        ...category,
                        isEditingImage: false
                    }
                }
            });
            
            

        default:
            return state;
    }
}


export default categoriesReducer;


