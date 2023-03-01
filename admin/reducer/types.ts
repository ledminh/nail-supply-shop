import { _CategoryType, _ProductType, _ProductGroupType } from '../types';


export type CacheType = {
    catImageFiles: {
        [key:string]: File|string;
    };
    productImages: {
        [key:string]: (File| {
            url: string;
            alt?: string;
        })[];
    };
}

export type StateType = {
    categories: _CategoryType[];
    products:(_ProductType|_ProductGroupType)[];
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
        image: File|string;
    };
} | {
    type:'CACHE/DELETE_CAT_IMAGE';
    payload: {
        categoryID: string;
    };
} |  {
    type:'CACHE/SET_PRODUCT_IMAGES';
    payload: {
        productID: string;
        files: (File|{
            url: string;
            alt?: string;
        })[];
    }
} | {
    type:'CACHE/DELETE_ALL_PRODUCT_IMAGES';
    payload: {
        productID: string;
    };
} |

// Products
{
    type:'PROD/SET';
    payload:(_ProductType|_ProductGroupType)[];
} | {
    type:'PROD/ADD_SINGLE';
    payload: _ProductType;
} | {
    type:'PROD/ADD_GROUP';
    payload: _ProductGroupType;
} | {
    type: 'PROD/SET_IS_EDITING_IMAGES';
    payload: {
        productID: string;
        isEditingImages: boolean;
    };
} | {
    type: 'PROD/RESET_IS_EDITING_IMAGES';

} |


// About
{
    type:'ABOUT/SET_HTML_TEXT';
    payload:string;
}; 