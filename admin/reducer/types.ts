import { ProductGroupType } from '../../database';
import { _CategoryType, _ProductType } from '../types';


export type CacheType = {
    catImageFiles: {
        [key:string]: File;
    };
}

export type StateType = {
    categories: _CategoryType[];
    products:(_ProductType|ProductGroupType)[];
    aboutHtmlText:string;
    cache: CacheType;
}

export type ActionType = 
// Categories
{
    type:'CAT/SET';
    payload: _CategoryType[];
} | {
    type:'CAT/ADD';
    payload: _CategoryType;
} | {
    type:'CAT/UPDATE';
    payload: _CategoryType;
} | {
    type:'CAT/SET_TO_BE_DELETED';
    payload: string;
} | {
    type:'CAT/DELETE';
    payload: string;
} | {
    type:'CAT/SET_IS_EDITING_IMAGE';
    payload: {
        categoryID: string;
        isEditingImage: boolean;
    };
} | {
    type: 'CAT/RESET_IS_EDITING_IMAGE';
} | 

// Cache
{
    type:'CACHE/SET_CAT_IMAGE_FILE';
    payload: {
        categoryID: string;
        file: File;
    };
} | {
    type:'CACHE/DELETE_CAT_IMAGE';
    payload: string;
} | 

// Products
{
    type:'PROD/SET';
    payload:(_ProductType|ProductGroupType)[];
} | {
    type:'PROD/ADD_SINGLE';
    payload: _ProductType;
} | 

// About
{
    type:'ABOUT/SET_HTML_TEXT';
    payload:string;
}; 