import { _CategoryType } from "../types";
import { ActionType } from "./types";



const categoriesReducer = (state:_CategoryType[], action:ActionType) => {
    switch(action.type) {
        case 'SET_CATEGORIES':
            return action.payload;
        default:
            return state;
    }
}


export default categoriesReducer;


