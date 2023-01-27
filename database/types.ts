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

export type ProductDBType = {
    categoryID: string;
    id: string;
    name: string;
    shortDescription: string;
    fullDescription: string;
    price: number;
    imageUrl: string;
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


export type ResponseType<T> = ['success', T] | ['error', string];





/*****************************
 * Function Types  
 */

    // from index.ts

export type getCategoriesType = () => Promise<ResponseType<CategoryType[]>>;
export type getProductsType = () => Promise<ResponseType<ProductType[]>>;
export type getSummaryProductsType = () => Promise<ResponseType<ProductSummaryType[]>>;
export type getProductByIdType = (id: string) => Promise<ResponseType<ProductType>>;
export type getCategoryInfoType = (id: string) => Promise<ResponseType<CategoryInfoType>>;
export type getSummaryProductsByCategoryIDType = (catID: string) => Promise<ResponseType<ProductSummaryType[]>>;


    // from *data.ts
export type getCategoryInfosFromDBType = () => Promise<CategoryInfoType[]>;
export type getCategoriesFromDBType = () => Promise<CategoryType[]>;
export type getProductsFromDBType = () => Promise<ProductDBType[]>;
export type getProductByIdFromDBType = (id: string) => Promise<ProductDBType>;
export type getSummaryProductsByCategoryIDFromDBType = (catID:string) => Promise<ProductSummaryType[]>;