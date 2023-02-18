import { _CategoryType } from "../types";
import { ActionType } from "./types";



const categoriesReducer = (state:_CategoryType[], action:ActionType) => {
    switch(action.type) {
        case 'SET_CATEGORIES':
            return action.payload;

        case 'ADD_CATEGORY':
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


        default:
            return state;
    }
}


export default categoriesReducer;


