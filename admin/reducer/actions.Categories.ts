import { CategoryType } from "../../database";
import { ActionType } from "./types";



export const setCategories = (categories:CategoryType[], dispatch: React.Dispatch<ActionType>) => {
    dispatch({
        type: 'SET_CATEGORIES',
        payload: categories
    });
}

