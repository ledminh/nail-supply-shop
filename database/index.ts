/**********************************************************
 * This file is the entry point for the database module
 * It exports the types and functions that are used on the
 * frontend
 *********************************************************/


// return types for API functions
import { CategoryType, ProductType, ProductImageType, ProductGroupItemType, ProductGroupType, PageInfoType, HomePageDataType, AboutPageDataType, CategoryPageDataType, ShopPageDataType, AdminPageDataType, ProductPageDataType, ResponseType } from './types';

// database functions, these functions are used to get data from the database, interact directly with the database
import {getDBCategories, addDBCategory, updateDBCategory, deleteDBCategory, getDBProducts, getDBProduct, addDBProduct, updateDBProduct, addDBProductGroup, getDBPageInfo, getDBAboutHtmlText} from './sampleDB';

// types for API functions implemented in this file
import {GetCategoriesType, AddCategoryType, UpdateCategoryType, DeleteCategoryType, GetProductsType, GetProductType, AddProductType, UpdateProductType, AddProductGroupType, GetCategoryPageDataType, GetShopPageDataType, GetAboutPageDataType, GetAdminPageDataType, GetProductPageDataType, GetHomePageDataType} from './types';

import { defaultSortConfig } from '../config';





/**********************************
 * Public types
 * --------------------------------
 * These types are used on Frontend,
 * for now, they are the same as the
 * types used on the database schema,
 * but it may change in the future. 
 */


export type {CategoryType, ProductType, ProductGroupItemType, ProductGroupType, ProductImageType, PageInfoType, HomePageDataType, AboutPageDataType, CategoryPageDataType, ProductPageDataType, ShopPageDataType, AdminPageDataType, ResponseType};


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

export const addCategory:AddCategoryType = async (newCategory) => {
    try {
        const newCategoryDB = await addDBCategory(newCategory);

        return ['success', newCategoryDB];
    }
    catch(err) {
        return ['error', (err as Error).message];
    }
}


export const updateCategory:UpdateCategoryType = async (category) => {
    try {
        const updatedCategory = await updateDBCategory(category);

        return ['success', updatedCategory];
    }
    catch(err) {
        return ['error', (err as Error).message];
    }
}

export const deleteCategory:DeleteCategoryType = async (id) => {
    try {
        const deletedCatID = await deleteDBCategory(id);
        
        return ['success', deletedCatID];
    }
    catch(err) {
        return ['error', (err as Error).message];
    }
}



export const getProducts:GetProductsType = async (options) => {
    try {

        if(!options.sort) {
            options.sort = defaultSortConfig
        }
        
        
        const {products, total} = await getDBProducts(options);

        return ['success', {products, total}];
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

export const addProduct:AddProductType = async (newProduct) => {
    try {
        const newProductDB = await addDBProduct(newProduct);

        return ['success', newProductDB];

    }
    catch(err) {
        return ['error', (err as Error).message];
    }
}

export const updateProduct:UpdateProductType = async (product) => {
    try {
        const updatedProduct = await updateDBProduct(product);

        return ['success', updatedProduct];
    }
    catch(err) {
        return ['error', (err as Error).message];
    }
}

export const addProductGroup:AddProductGroupType = async (newProductGroup) => {
    try {
        const newProductGroupDB = await addDBProductGroup(newProductGroup);

        return ['success', newProductGroupDB];

    }
    catch(err) {
        return ['error', (err as Error).message];
    }
}



// fetches data for pages

export const getHomePageData:GetHomePageDataType = async () => {
    try {
        const pageInfo = await getDBPageInfo('Home');

        const {products: newArrivalProducts} = await getDBProducts({sort: {type: 'date', order: 'desc'}, limit: 4});
        const {products: bestSellerProducts} = await getDBProducts({sort: {type: 'sellCount', order: 'desc'}, limit: 4});

        return ['success', {pageInfo, newArrivalProducts, bestSellerProducts}];
    }
    catch(err) {
        return ['error', (err as Error).message];
    }
}

export const getAboutPageData:GetAboutPageDataType = async () => {
    try {
        const pageInfo = await getDBPageInfo('About');
        const aboutHtmlText = await getDBAboutHtmlText();

        return ['success', {
            pageInfo,
            aboutHtmlText
        }];
    }
    catch(err) {
        return ['error', (err as Error).message];
    }
}


export const getShopPageData:GetShopPageDataType = async () => {
    try {
        const pageInfo = await getDBPageInfo('Shop');
        const categories = await getDBCategories();

        return ['success', {
            pageInfo, 
            categories
        }];
    }
    catch(err) {
        return ['error', (err as Error).message];
    }
}


export const getCategoryPageData:GetCategoryPageDataType = async ({categorySlug, price, sort}) => {

    try {       
        const pageInfo = await getDBPageInfo('Shop');
        const categories = await getDBCategories();

        if(!categorySlug) {

            return ['success', {
                pageInfo,
                categories, 
                selectedCategoryID: null, 
                priceRange: price? price : null,
                currentSort: sort? sort : null         
            }];
        }

        const category = categories.find(category => category.slug === categorySlug);

        if(!category) {
            return ['error', 'Category not found'];
        }


        return ['success', {
            pageInfo,
            categories, 
            selectedCategoryID: category.id, 
            priceRange: price? price : null,
            currentSort: sort? sort : null

        }];
    }
    catch(err) {
        return ['error', (err as Error).message];
    }
}

export const getProductPageData:GetProductPageDataType = async (productID) => {
    try {
        let product = await getDBProduct(productID);

        if(!product) {
            return ['error', 'Product not found'];
        }

        let mainProduct;
        if(Array.isArray(product)) {
            mainProduct = product.find(product => product.mainProduct);
            
            if(!mainProduct) {
                return ['error', 'Main product not found'];
            }

        }
        else {
            mainProduct = product;
        }



        return ['success', {
            pageInfo: {
                id: mainProduct.id,
                title: mainProduct.name,
                description: mainProduct.shortDescription,
                subtitle: mainProduct.shortDescription,
            },
            product
        }];
    }
    catch(err) {
        return ['error', (err as Error).message];
    }
}

export const getAdminPageData:GetAdminPageDataType = async () => {
    try {
        const categories = await getDBCategories();
        const {products} = await getDBProducts({});
        
        return ['success', {
            pageInfo: {
                id: 'admin',
                title: 'Admin',
            },
            categories,
            products,
            aboutHtmlText: '',
        }];
    }
    catch(err) {
        return ['error', (err as Error).message];
    }
}