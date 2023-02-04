/**********************************************************
 * This file is the entry point for the database module
 * It exports the types and functions that are used on the
 * frontend
 *********************************************************/


// return types for API functions
import { CategoryType, ProductType, PageInfoType, HomePageDataType, AboutPageDataType, CategoryPageDataType, ShopPageDataType, AdminPageDataType, ProductPageDataType, ResponseType } from './types';

// database functions, these functions are used to get data from the database, interact directly with the database
import {getDBCategories, getDBProducts, getDBProduct, getDBPageInfo} from './sampleDB';

// types for API functions implemented in this file
import {GetCategoriesType, GetProductsType, GetProductType, GetCategoryPageDataType, GetShopPageDataType, GetAboutPageDataType, GetAdminPageDataType, GetProductPageDataType, GetHomePageDataType} from './types';





/**********************************
 * Public types
 * --------------------------------
 * These types are used on Frontend,
 * for now, they are the same as the
 * types used on the database schema,
 * but it may change in the future. 
 */

export type {CategoryType, ProductType, PageInfoType, HomePageDataType, AboutPageDataType, CategoryPageDataType, ProductPageDataType, ShopPageDataType, AdminPageDataType, ResponseType};


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


// fetches data for pages

export const getHomePageData:GetHomePageDataType = async () => {
    try {
        const pageInfo = await getDBPageInfo('Home');

        return ['success', {pageInfo, ...{
            newArrivalProducts: [
                {
                    id: '1',
                    categoryID: '1',
                    name: 'Red Nail Polish',
                    shortDescription: 'Classic red nail polish',
                    fullDescription: 'This classic red nail polish is a must-have for any nail collection. The long-lasting, chip-resistant formula will leave your nails looking beautiful and shiny. This shade is perfect for any occasion, from casual to formal.',
                    price: 5.99,
                    imageUrl: '/images/001.jpg'
                },
                {
                    id: '2',
                    categoryID: '1',
                    name: 'Glitter Nail Polish',
                    shortDescription: 'Glitter nail polish for adding sparkle to your nails',
                    fullDescription: 'This glitter nail polish is perfect for adding some sparkle to your nails. The long-lasting, chip-resistant formula will keep your nails looking beautiful and shiny. The glitter particles are fine and will not fall off easily.',
                    price: 6.99,
                    imageUrl: '/images/002.jpg'
                },
                {
                    id: '3',
                    categoryID: '2',
                    name: 'Nail Clipper',
                    shortDescription: 'Stainless steel nail clipper for trimming nails',
                    fullDescription: 'This stainless steel nail clipper is perfect for trimming nails. It features a sharp and precise cutting edge for a clean cut every time. It also has a built-in file for shaping and smoothing nails.',
                    price: 3.99,
                    imageUrl: '/images/003.jpg'
                },
                {
                    id: '4',
                    categoryID: '3',
                    name: 'Nail Art Stickers',
                    shortDescription: 'Nail art stickers for decorating nails',
                    fullDescription: 'This set of nail art stickers includes a variety of designs and patterns, perfect for decorating nails. The stickers are easy to apply and can be used to add a pop of color and interest to any manicure.',
                    price: 4.99,
                    imageUrl: '/images/004.jpg'
                }
            ],
    
            bestSellerProducts: [
                {
                    id: '1',
                    categoryID: '1',
                    name: 'Red Nail Polish',
                    shortDescription: 'Classic red nail polish',
                    fullDescription: 'This classic red nail polish is a must-have for any nail collection. The long-lasting, chip-resistant formula will leave your nails looking beautiful and shiny. This shade is perfect for any occasion, from casual to formal.',
                    price: 5.99,
                    imageUrl: '/images/001.jpg'
                },
                {
                    id: '2',
                    categoryID: '1',
                    name: 'Glitter Nail Polish',
                    shortDescription: 'Glitter nail polish for adding sparkle to your nails',
                    fullDescription: 'This glitter nail polish is perfect for adding some sparkle to your nails. The long-lasting, chip-resistant formula will keep your nails looking beautiful and shiny. The glitter particles are fine and will not fall off easily.',
                    price: 6.99,
                    imageUrl: '/images/002.jpg'
                },
                {
                    id: '3',
                    categoryID: '2',
                    name: 'Nail Clipper',
                    shortDescription: 'Stainless steel nail clipper for trimming nails',
                    fullDescription: 'This stainless steel nail clipper is perfect for trimming nails. It features a sharp and precise cutting edge for a clean cut every time. It also has a built-in file for shaping and smoothing nails.',
                    price: 3.99,
                    imageUrl: '/images/003.jpg'
                },
                {
                    id: '4',
                    categoryID: '3',
                    name: 'Nail Art Stickers',
                    shortDescription: 'Nail art stickers for decorating nails',
                    fullDescription: 'This set of nail art stickers includes a variety of designs and patterns, perfect for decorating nails. The stickers are easy to apply and can be used to add a pop of color and interest to any manicure.',
                    price: 4.99,
                    imageUrl: '/images/004.jpg'
                }
            ]
        }}];
    }
    catch(err) {
        return ['error', (err as Error).message];
    }
}

export const getAboutPageData:GetAboutPageDataType = async () => {
    try {
        const pageInfo = await getDBPageInfo('About');

        return ['success', {pageInfo}];
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


export const getCategoryPageData:GetCategoryPageDataType = async (categorySlug) => {

    try {       

        const categories = await getDBCategories();

        if(!categorySlug) {
            const products = await getDBProducts();

            return ['success', {
                pageInfo: {
                    id: 'category/all-products',
                    title: 'All Products',
                    description: 'All Products',
                },
                
                categories, 
                selectedCategoryID: '', 
                products
                
            }];
        }

        const category = categories.find(category => category.slug === categorySlug);

        if(!category) {
            return ['error', 'Category not found'];
        }

        const products = await getDBProducts({categoryID: category.id});

        return ['success', {
            pageInfo: {
                id: category.id,
                title: category.name,
                description: category.description,
                subtitle: category.description,
                heroImage: {
                    image: category.imageUrl,
                    alt: category.name
                }
            },
            categories, 
            selectedCategoryID: category.id, 
            products

        }];
    }
    catch(err) {
        return ['error', (err as Error).message];
    }
}

export const getProductPageData:GetProductPageDataType = async (productID) => {
    try {
        const product = await getDBProduct(productID);

        if(!product) {
            return ['error', 'Product not found'];
        }

        return ['success', {
            pageInfo: {
                id: product.id,
                title: product.name,
                description: product.shortDescription,
                subtitle: product.shortDescription,
                heroImage: {
                    image: product.imageUrl,
                    alt: product.name
                }
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
        const products = await getDBProducts();
        
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