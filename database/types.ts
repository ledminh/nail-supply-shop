
/*********************************************
 *  Database schema
 * -------------------------------------------
 *  This is how the database should look like.
 */  

export type DBCategoryType = {
    id: string;
    name: string;
    slug: string;
    description: string;
    imageUrl: string;
};

export type DBProductType = {
    categoryID: string;
    id: string;
    name: string;
    shortDescription: string;
    fullDescription: string;
    price: number;
    imageUrl: string;
};


export type DBSubtitleType = {
    id: string,
    name: 'home' | 'about' | 'shop';
    text: string;
};




/*********************************************
 * Response from API functions
 */ 

    // Generic type for response from API functions
export type ResponseType<T> = ['success', T] | ['error', string];

    // Specific types for response from API functions
export type CategoryType = DBCategoryType;
export type ProductType = DBProductType;
export type SubtitleType = DBSubtitleType;

export type CategoryPageDataType = {
    currentCategoryID: string;
    categories: CategoryType[];
    products: ProductType[];
};





/*********************************************
 *  API functions
 * -------------------------------------------
 * Functions in index.ts, which are called 
 * by client code (frontend). 
 */

export type GetCategoriesType = () => Promise<ResponseType<CategoryType[]>>;

export type GetProductsType = (options?: {
    limit?: number;
    offset?: number;
    categoryID?: string;    
}) => Promise<ResponseType<ProductType[]>>;


export type GetProductType = (id: string) => Promise<ResponseType<ProductType>>;

export type GetCategoryPageDataType = (categorySlug: string) => Promise<ResponseType<CategoryPageDataType>>;


/*********************************************
 * Database functions
 * -------------------------------------------
 * Functions from *DB.ts, which are called 
 * by the functions in index.tsx and directly work 
 * with the database. Should be implemented 
 * differently for different databases.
 */


export type GetDBCategoriesType = () => Promise<DBCategoryType[]>;

export type GetDBProductsType = (options?:{
    limit?: number;
    offset?: number;
    categoryID?: string;    
}) => Promise<DBProductType[]>;

export type GetDBProductType = (id: string) => Promise<DBProductType>;
