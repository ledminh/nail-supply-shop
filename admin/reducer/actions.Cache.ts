import { ActionType, StateType } from "./types";

export const deleteCategoryImageOnCache = (
    categoryID:string,
    dispatch: React.Dispatch<ActionType>) => {

    dispatch({
        type: 'CACHE/DELETE_CAT_IMAGE',
        payload: categoryID
    });
}

export const setCategoryImageOnCache = (
    categoryID:string,
    file:File,
    dispatch: React.Dispatch<ActionType>) => {

    dispatch({
        type: 'CACHE/SET_CAT_IMAGE_FILE',
        payload: {
            categoryID,
            file
        }
    });
}

export const getCategoryImageFromCache = (
    categoryID:string,
    state:StateType
) => {

    if(!state.cache.catImageFiles[categoryID]) {
        return undefined;
    }

    return state.cache.catImageFiles[categoryID];
}






