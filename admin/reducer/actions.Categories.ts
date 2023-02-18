import { ActionType } from "./types";
import { _CategoryType } from "../types";


export const setCategories = (_categories:_CategoryType[], dispatch: React.Dispatch<ActionType>) => {

    dispatch({
        type: 'SET_CATEGORIES',
        payload: _categories
    });
}

