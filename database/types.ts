
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
export type ResponseType<T> = ['success', T] | ['error', string];





/*********************************************
 *  API functions
 * -------------------------------------------
 * Functions in index.ts, which are called 
 * by client code (frontend). 
 */

export type GetCategoriesType = () => Promise<ResponseType<DBCategoryType[]>>;

export type GetProductsType = (options?: {
    limit?: number;
    offset?: number;
    categoryID?: string;    
}) => Promise<ResponseType<DBProductType[]>>;


export type GetProductType = (id: string) => Promise<ResponseType<DBProductType>>;



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
