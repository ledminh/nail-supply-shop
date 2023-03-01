import { ActionType, CacheType } from "./types";



const cacheReducer = (state:CacheType, action:ActionType) => {
    switch(action.type) {
        case 'CACHE/SET_CAT_IMAGE_FILE':
            return {
                ...state,
                catImageFiles: {
                    ...state.catImageFiles,
                    [action.payload.categoryID]: action.payload.image
                }
            };

        case 'CACHE/DELETE_CAT_IMAGE':
            const newCatImageFiles = {...state.catImageFiles};

            delete newCatImageFiles[action.payload.categoryID];

            return {
                ...state,
                catImageFiles: newCatImageFiles
            };

            
        case 'CACHE/SET_PRODUCT_IMAGES':
            return {
                ...state,
                productImages: {
                    ...state.productImages,
                    [action.payload.productID]: action.payload.files
                }
            };

        case 'CACHE/DELETE_ALL_PRODUCT_IMAGES':
            const newProductImages = {...state.productImages};

            delete newProductImages[action.payload.productID];

            return {
                ...state,
                productImages: newProductImages
            };




            
            
        default:
            return state;
    }
}

export default cacheReducer;