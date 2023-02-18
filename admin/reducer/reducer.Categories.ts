import { CategoryType } from "../../database";
import { ActionType } from "./types";


const categoriesReducer = (state:CategoryType[], action:ActionType) => {
    switch(action.type) {
        case 'SET_CATEGORIES':
            return action.payload;
        default:
            return state;
    }
}


export default categoriesReducer;


