/**********************************************************
 * This file is the entry point for the database module
 * It exports the types and functions that are used on the
 * frontend
 *********************************************************/


// return types for API functions
import { CategoryType, ProductType, SubtitleType, CategoryPageDataType, ShopPageDataType, ResponseType } from './types';

// database functions, these functions are used to get data from the database, interact directly with the database
import {getDBCategories, getDBProducts, getDBProduct} from './sampleDB';

// types for API functions implemented in this file
import {GetCategoriesType, GetProductsType, GetProductType, GetCategoryPageDataType, GetShopPageDataType} from './types';





/**********************************
 * Public types
 * --------------------------------
 * These types are used on Frontend,
 * for now, they are the same as the
 * types used on the database schema,
 * but it may change in the future. 
 */

export type {CategoryType, ProductType, SubtitleType, CategoryPageDataType, ShopPageDataType, ResponseType};


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

export const getCategoryPageData:GetCategoryPageDataType = async (categorySlug) => {

    try {       

        const categories = await getDBCategories();

        if(!categorySlug) {
            const products = await getDBProducts();

            return ['success', {categories, currentCategoryID: '', products}];
        }

        const category = categories.find(category => category.slug === categorySlug);

        if(!category) {
            return ['error', 'Category not found'];
        }

        const products = await getDBProducts({categoryID: category.id});

        return ['success', {categories, currentCategoryID: category.id, products}];
    }
    catch(err) {
        return ['error', (err as Error).message];
    }
}

export const getShopPageData:GetShopPageDataType = async () => {
    try {
        const categories = await getDBCategories();

        return ['success', {categories}];
    }
    catch(err) {
        return ['error', (err as Error).message];
    }
}