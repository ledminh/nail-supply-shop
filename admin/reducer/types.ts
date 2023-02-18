import { ProductType, ProductGroupType } from '../../database';
import { _CategoryType } from '../types';



export type StateType = {
    categories: _CategoryType[];
    products:(ProductType|ProductGroupType)[];
    aboutHtmlText:string;
}

export type ActionType = {
    type:'CAT/SET';
    payload: _CategoryType[];
} | {
    type:'CAT/ADD';
    payload: _CategoryType;
} | {
    type:'CAT/SET_TO_BE_DELETED';
    payload: string;
} | {
    type:'CAT/DELETE';
    payload: string;
} | {
    type:'PROD/SET';
    payload:(ProductType|ProductGroupType)[];
} | {
    type:'ABOUT/SET_HTML_TEXT';
    payload:string;
}; 