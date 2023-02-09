/**********************************************************
 * This file is the entry point for the database module
 * It exports the types and functions that are used on the
 * frontend
 *********************************************************/


// return types for API functions
import { CategoryType, ProductType, ProductGroupType, PageInfoType, HomePageDataType, AboutPageDataType, CategoryPageDataType, ShopPageDataType, AdminPageDataType, ProductPageDataType, ResponseType, DBProductImageType } from './types';

// database functions, these functions are used to get data from the database, interact directly with the database
import {getDBCategories, getDBProducts, getDBProduct, getDBPageInfo, getDBAboutHtmlText} from './sampleDB';

// types for API functions implemented in this file
import {GetCategoriesType, GetProductsType, GetProductType, GetCategoryPageDataType, GetShopPageDataType, GetAboutPageDataType, GetAdminPageDataType, GetProductPageDataType, GetHomePageDataType} from './types';
import { defaultSortConfig } from '../config';





/**********************************
 * Public types
 * --------------------------------
 * These types are used on Frontend,
 * for now, they are the same as the
 * types used on the database schema,
 * but it may change in the future. 
 */

type ProductImageType = DBProductImageType;

export type {CategoryType, ProductType, ProductGroupType, ProductImageType, PageInfoType, HomePageDataType, AboutPageDataType, CategoryPageDataType, ProductPageDataType, ShopPageDataType, AdminPageDataType, ResponseType};


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

        console.log(mainProduct);


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