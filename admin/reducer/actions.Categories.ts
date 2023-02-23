import { ActionType, StateType } from "./types";

import { CategoryType } from "../../database";
import { CategoryToAdd, _CategoryType } from "../types";
import convertCategory from "../tools/convertCategory";
import postCategory from "../tools/postCategory";

export const setCategories = (
    categories:CategoryType[], 
    dispatch: React.Dispatch<ActionType>) => {
    
        dispatch({
            type: 'CAT/SET',
            payload: categories.map(convertCategory)
        });
}

export const addCategory = (
    categoryToAdd: CategoryToAdd, 
    dispatch: React.Dispatch<ActionType>) => {
        
        
        postCategory({
            type: 'add',
            data: categoryToAdd,
            onSuccess: (newCategory) => {
                if(newCategory){
                    dispatch({
                        type: 'CAT/ADD',
                        payload: convertCategory(newCategory)
                    });
                }
            }
        });


}

export const updateCategory = (
    category:CategoryType,
    dispatch: React.Dispatch<ActionType>) => {

        dispatch({
            type: 'CAT/UPDATE',
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
    isEditingImage:boolean,
    dispatch: React.Dispatch<ActionType>) => {

        dispatch({
            type: 'CAT/SET_IS_EDITING_IMAGE',
            payload: {
                categoryID,
                isEditingImage
            }
        });
}

export const resetIsEditingImageCategory = (
    dispatch: React.Dispatch<ActionType>) => {

        dispatch({
            type: 'CAT/RESET_IS_EDITING_IMAGE',
        });
}

export const getEditingImageCategoryID = (
    state:StateType) => {
        return state.categories.find(cat => cat.isEditingImage)?.id;

}


export const getCategories = (
    state:StateType) => {
        return state.categories;
}