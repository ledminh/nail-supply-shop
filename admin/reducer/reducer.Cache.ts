import { ActionType, CacheType } from "./types";



const cacheReducer = (state:CacheType, action:ActionType) => {
    switch(action.type) {
        case 'CACHE/SET_CAT_IMAGE_FILE':
            return {
                ...state,
                catImageFiles: {
                    ...state.catImageFiles,
                    [action.payload.categoryID]: action.payload.file
                }
            };

        case 'CACHE/DELETE_CAT_IMAGE':
            const newCatImageFiles = {...state.catImageFiles};

            delete newCatImageFiles[action.payload];

            return {
                ...state,
                catImageFiles: newCatImageFiles
            };

            

        default:
            return state;
    }
}

export default cacheReducer;