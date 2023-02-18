import { StateType, ActionType } from './types';



export const initialState:StateType = {
    categories: [],
    products: [],
    aboutHtmlText: ''
};



const reducer = (state:StateType, action:ActionType) => {
    switch(action.type) {
        case 'SET_CATEGORIES':
            return {
                ...state,
                categories: action.payload
            };
        case 'SET_PRODUCTS':
            return {
                ...state,
                products: action.payload
            };
        case 'SET_ABOUT_HTML_TEXT':
            return {
                ...state,
                aboutHtmlText: action.payload
            };
        default:
            return state;
    }

}

export default reducer;