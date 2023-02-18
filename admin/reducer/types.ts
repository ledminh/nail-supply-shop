import { CategoryType, ProductType, ProductGroupType } from '../../database';
import { _CategoryType } from '../types';



export type StateType = {
    categories: _CategoryType[];
    products:(ProductType|ProductGroupType)[];
    aboutHtmlText:string;
}

export type ActionType = {
    type:'SET_CATEGORIES';
    payload: _CategoryType[];
} | {
    type:'SET_PRODUCTS';
    payload:(ProductType|ProductGroupType)[];
} | {
    type:'SET_ABOUT_HTML_TEXT';
    payload:string;
}; 