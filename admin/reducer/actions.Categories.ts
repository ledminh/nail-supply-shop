import { ActionType, StateType } from "./types";

import { CategoryType } from "../../database";
import { _CategoryType } from "../types";
import convertCategory from "../tools/convertCategory";

export const setCategories = (
    categories:CategoryType[], 
    dispatch: React.Dispatch<ActionType>) => {
    
        dispatch({
            type: 'CAT/SET',
            payload: categories.map(convertCategory)
        });
}

export const addCategory = (
    category:CategoryType, 
    dispatch: React.Dispatch<ActionType>) => {
    
        dispatch({
            type: 'CAT/ADD',
            payload: convertCategory(category)
        });
}

export const setToBeDeletedCategory = (
    categoryID:string,
    dispatch: React.Dispatch<ActionType>) => {

        dispatch({
            type: 'CAT/SET_TO_BE_DELETED',
            payload: categoryID
        });
}

export const deleteCategory = (
    categoryID:string,
    dispatch: React.Dispatch<ActionType>) => {

        dispatch({
            type: 'CAT/DELETE',
            payload: categoryID
        });
}

export const setIsEditingImageCategory = (
    categoryID:string,
    dispatch: React.Dispatch<ActionType>) => {

        dispatch({
            type: 'CAT/SET_IS_EDITING_IMAGE',
            payload: categoryID
        });
}

export const getCategories = (
    state:StateType) => {
        return state.categories;
}