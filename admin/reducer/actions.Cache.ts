import { ActionType, StateType } from "./types";


export const setCatImgFileOnCache = (
    file:File|null,
    dispatch: React.Dispatch<ActionType>) => {
    
    dispatch({
        type: 'CACHE/SET_CAT_IMAGE_FILE',
        payload: file
    });
}

export const getCatImgFileFromCache = (state:StateType) => {
    return state.cache.catImageFile;
}

