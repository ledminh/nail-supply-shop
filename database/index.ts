import {products, categories} from './data';

/*****************************
 * Data Types  
 */

export type SubtitleType = {
    id: string,
    name: 'home' | 'about' | 'shop';
    text: string;
};

export type CategoryType = {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
};

export type CategoryInfoType = {
    id: string;
    name: string;
};

export type ProductSummaryType = {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
};

export type ProductType = ProductSummaryType & {
    categoryInfo: CategoryInfoType;
};

/*****************************
 * private functions
 */

const getCategoryInfo = (id: string):CategoryInfoType => {
    const category = categories.find((category) => category.id === id);

    if (!category) {
        throw new Error('Category not found');
    }

    return {
        id: category.id,
        name: category.name,
    }
};


/*****************************
 * public functions
 */

export const getCategories = ():CategoryType[] => {
    return categories;
};

export const getCategoryInfos = ():CategoryInfoType[] => {
    return categories.map((category) => {
        return {
            id: category.id,
            name: category.name,
        };
    });
};

export const getCategoryById = (id: string):CategoryType => {
    const category = categories.find((category) => category.id === id);

    if (!category) {
        throw new Error('Category not found');
    }

    return category;
};

export const getSummaryProductsByCategoryID = (catID:string):ProductSummaryType[] => {
    const summaryProducts = products
                                .filter((product) => product.categoryID === catID)
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

    return summaryProducts;
};



export const getSummaryProducts = ():ProductSummaryType[] => {
    const summaryProducts = products.map((product) => {
        const { id, name, shortDescription, price, imageUrl, categoryID } = product;

        return {
            id,
            name,
            price,
            description: shortDescription,
            imageUrl
        };

    });

    return summaryProducts;
};

export const getProducts = ():ProductType[] => {
    return products.map((product) => {
        const { id, name, fullDescription, price, imageUrl, categoryID } = product;
        return {
            id,
            name,
            price,
            description: fullDescription,
            imageUrl,
            categoryInfo: getCategoryInfo(categoryID)
        };
    });
};



export const getProductById = (id: string):ProductType => {
    const product = products.find((product) => product.id === id);

    if (!product) {
        throw new Error('Product not found');
    }

    return {
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.fullDescription,
        imageUrl: product.imageUrl,
        categoryInfo: getCategoryInfo(product.categoryID)
    };
};


