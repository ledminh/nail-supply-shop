import { ActionType, CacheType } from "./types";



const cacheReducer = (state:CacheType, action:ActionType) => {
    switch(action.type) {
        case 'CACHE/SET_CAT_IMAGE_FILE':
            return {
                ...state,
                catImageFile: action.payload
            }
        default:
            return state;
    }
}

export default cacheReducer;