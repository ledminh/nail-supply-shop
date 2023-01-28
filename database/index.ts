import { DBCategoryType, DBProductType, DBSubtitleType, ResponseType } from './types';

import {getDBCategories, getDBProducts, getDBProduct} from './sampleDB';

import {GetCategoriesType, GetProductsType, GetProductType} from './types';




/*****************************
 * public types
 */

export type { DBCategoryType, DBProductType, DBSubtitleType, ResponseType };


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