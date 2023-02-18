import { StateType, ActionType } from './types';

import categoriesReducer from './reducer.Categories';
import productsReducer from './reducer.Products';
import aboutHtmlTextReducer from './reducer.AboutHtmlText';


export const initialState:StateType = {
    categories: [],
    products: [],
    aboutHtmlText: ''
};



const reducer = (state:StateType, action:ActionType) => {
    return {
        categories: categoriesReducer(state.categories, action),
        products: productsReducer(state.products, action),
        aboutHtmlText: aboutHtmlTextReducer(state.aboutHtmlText, action),
    };

}

export default reducer;