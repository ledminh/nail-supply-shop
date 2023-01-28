import { CategoryInfoType, CategoryType, ProductSummaryType, ProductType, SubtitleType, ResponseType, getSummaryProductsByCategoryIDType } from './types';

import {getCategoryInfoType, getCategoriesType, getProductSummariesByCatSlugType, getProductsType, getSummaryProductsType, getProductByIdType} from './types';

import {getCategoryInfosFromDB, getCategoriesFromDB, getProductsFromDB, getProductByIdFromDB, getSummaryProductsByCategoryIDFromDB} from './sampleData';


/*****************************
 * public types
 */

export type { CategoryType, CategoryInfoType, ProductSummaryType, ProductType, SubtitleType, ResponseType };


/*****************************
 * public functions
 */

export const getCategories:getCategoriesType = async () => {
    try {
        const categories = await getCategoriesFromDB();

        return ['success', categories];
    }
    catch(err) {
        return ['error', (err as Error).message];
    }   

};




export const getProducts:getProductsType = async () => {
    try {
        const products = await getProductsFromDB();
        const categoryInfos = await getCategoryInfosFromDB(); 
    
        
        const fullDescProducts = products.map((product) => {
            const { id, name, fullDescription, price, imageUrl, categoryID } = product;
    
            const categoryInfo = categoryInfos.find((catInfo) => catInfo.id === categoryID);
    
            if(!categoryInfo) {
                throw new Error(`Category of product ${name} not found`);
            }
    
            return {
                id,
                name,
                price,
                description: fullDescription,
                imageUrl,
                categoryInfo: categoryInfo
            };
        });

        return ['success', fullDescProducts]; 

    }
    catch(err) {
        return ['error', (err as Error).message];
    }
};



export const getSummaryProducts:getSummaryProductsType = async () => {
    try {
        const products = await getProductsFromDB();
    
        
        const summaryProducts = products.map((product) => {
            const { id, name, shortDescription, price, imageUrl } = product;
    
            return {
                id,
                name,
                price,
                description: shortDescription,
                imageUrl
            };
    
        });
    
        return ['success', summaryProducts];
    }
    catch(err) {
        return ['error', (err as Error).message];
    }
};


// TODO: this function should return products with category info, especially the description
const getProductSummariesByCatSlug:getProductSummariesByCatSlugType = async (catSlug) => {
    try {
        const products = await getProductsFromDB();
        const categories = await getCategoriesFromDB();

        const category = categories.find((cat) => cat.slug === catSlug);

        if (!category) {
            return ['error', `Category with slug ${catSlug} not found`];
        }

        const productSummaries = products.filter((product) => product.categoryID === category.id)
            .map((product) => {
                const { id, name, shortDescription, price, imageUrl } = product;

                return {
                    id,
                    name,
                    price,
                    description: shortDescription,
                    imageUrl
                };
                
            });

        return ['success', productSummaries];

    }
    catch(err) {
        return ['error', (err as Error).message];
    }

};


export const getProductById:getProductByIdType = async (id) => {
    try {
        const product = await getProductByIdFromDB(id);
        const [status, categoryInfoData] = await getCategoryInfo(product.categoryID);
        
        if (status === 'error') {
            throw new Error(categoryInfoData);
        }


        const fullDescProduct = {
            id: product.id,
            name: product.name,
            price: product.price,
            description: product.fullDescription,
            imageUrl: product.imageUrl,
            categoryInfo: categoryInfoData
        };
    
        return ['success', fullDescProduct]; 

    }
    catch(err) {
        return ['error', (err as Error).message];
    }
};




/*****************************
 * private functions
 */

const getCategoryInfo:getCategoryInfoType = async (id) => {

    try {
        const categoryInfos = await getCategoryInfosFromDB();
    
        const category = categoryInfos.find((catInfo) => catInfo.id === id);
    
        if (!category) {
            throw new Error('Category not found');
        }
    
        return ['success', category];
    }
    catch(err) {
        return ['error', (err as Error).message]
    }

};



export const getSummaryProductsByCategoryID:getSummaryProductsByCategoryIDType = async (catID) => {

    try {
        const summaryProducts = await getSummaryProductsByCategoryIDFromDB(catID);

        return ['success', summaryProducts];
    }
    catch(err) {
        return ['error', (err as Error).message];
    }

   
};







/***********************************************************
 ***********************************************************/ 



// export const getCategoryInfos = ():CategoryInfoType[] => {
//     return categories.map((category) => {
//         return {
//             id: category.id,
//             name: category.name,
//         };
//     });
// };

// export const getCategoryById = (id: string):CategoryType => {
//     const category = categories.find((category) => category.id === id);

//     if (!category) {
//         throw new Error('Category not found');
//     }

//     return category;
// };




