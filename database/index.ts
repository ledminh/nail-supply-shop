import { CategoryType, ProductType, SubtitleType, ResponseType } from './types';

import {getDBCategories, getDBProducts, getDBProduct} from './sampleDB';

import {GetCategoriesType, GetProductsType, GetProductType} from './types';




/**********************************
 * Public types
 * --------------------------------
 * These types are used on Frontend,
 * for now, they are the same as the
 * types used on the database schema,
 * but it may change in the future. 
 */

export type {CategoryType, ProductType, SubtitleType, ResponseType};


/*****************************
 * public functions
 */

export const getCategories:GetCategoriesType = async () => {
    try {
        const categories = await getDBCategories();

        return ['success', categories];
    }
    catch(err) {
        return ['error', (err as Error).message];
    }   

};

export const getProducts:GetProductsType = async (options) => {
    try {
        
        const products = await getDBProducts(options);

        return ['success', products];
    }
    catch(err) {
        return ['error', (err as Error).message];
    }
};


export const getProduct:GetProductType = async (id) => {
    try {
        const product = await getDBProduct(id);

        return ['success', product];
    }
    catch(err) {
        return ['error', (err as Error).message];
    }
};