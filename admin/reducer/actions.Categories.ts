import { ActionType, StateType } from "./types";

import { CategoryType } from "../../database";
import { _CategoryType } from "../types";
import convertCategory from "../tools/convertCategory";

export const setCategories = (
    categories:CategoryType[], 
    dispatch: React.Dispatch<ActionType>) => {
    
        dispatch({
            type: 'SET_CATEGORIES',
            payload: categories.map(convertCategory)
        });
}

export const addCategory = (
    category:CategoryType, 
    dispatch: React.Dispatch<ActionType>) => {
    
        dispatch({
            type: 'ADD_CATEGORY',
            payload: convertCategory(category)
        });
}

export const getCategories = (
    state:StateType) => {
        return state.categories;
}