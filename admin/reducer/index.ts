import { StateType, ActionType } from './types';

import categoriesReducer from './reducer.Categories';
import productsReducer from './reducer.Products';
import aboutHtmlTextReducer from './reducer.AboutHtmlText';

import cacheReducer from './reducer.Cache';

export const initialState:StateType = {
    categories: [],
    products: [],
    aboutHtmlText: '',
    cache: {
        newCatImageFile: null,
        catImageFile: null
    }

};



const reducer = (state:StateType, action:ActionType) => {
    return {
        categories: categoriesReducer(state.categories, action),
        products: productsReducer(state.products, action),
        aboutHtmlText: aboutHtmlTextReducer(state.aboutHtmlText, action),
        cache: cacheReducer(state.cache, action)
    };

}

export default reducer;