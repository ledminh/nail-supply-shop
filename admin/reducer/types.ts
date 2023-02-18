import { CategoryType, ProductType, ProductGroupType } from '../../database';





export type StateType = {
    categories: CategoryType[];
    products:(ProductType|ProductGroupType)[];
    aboutHtmlText:string;
}

export type ActionType = {
    type:'SET_CATEGORIES';
    payload:CategoryType[];
} | {
    type:'SET_PRODUCTS';
    payload:(ProductType|ProductGroupType)[];
} | {
    type:'SET_ABOUT_HTML_TEXT';
    payload:string;
}; 
