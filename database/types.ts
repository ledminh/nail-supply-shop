
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


export type DBPageInfoType = {
    id: string,
    title: string;
    description?: string;
    subtitle?: string;
}






/*********************************************
 * Response from API functions
 */ 
    
    // Generic type for response from API functions
export type ResponseType<T> = ['success', T ]
| ['error', string];

    // Specific types for response from API functions
export type CategoryType = DBCategoryType;
export type ProductType = DBProductType;
export type PageInfoType = DBPageInfoType;

    // Data types for pages

// base type for all page data types
type PageDataType = {
    pageInfo: PageInfoType;
}


export type HomePageDataType = PageDataType & {
    newArrivalProducts: ProductType[];
    bestSellerProducts: ProductType[];
};

export type AboutPageDataType = PageDataType;

export type CategoryPageDataType = PageDataType & {
    currentCategoryID: string;
    categories: CategoryType[];
    products: ProductType[];
};

export type ShopPageDataType =  PageDataType &{
    categories: CategoryType[];
}

export type AdminPageDataType = PageDataType; 


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

export type GetDBPageInfoType = (title: 'Home' | 'About' | 'Shop') => Promise<DBPageInfoType>;



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


    //------------------------------------------------
    // Each page has its own function, which fetches 
    // data for that page. These functions are called in 
    // the getServerSideProps function in the page 
    // component.

    // fetches data for home page
export type GetHomePageDataType = () => Promise<ResponseType<HomePageDataType>>;

    // fetches data for about page
export type GetAboutPageDataType = () => Promise<ResponseType<AboutPageDataType>>;


    // fetches data for category pages
export type GetCategoryPageDataType = (categorySlug?: string) => Promise<ResponseType<CategoryPageDataType>>;

    // fetches data for shop page
export type GetShopPageDataType = () => Promise<ResponseType<ShopPageDataType>>;

    // fetches data for admin page
export type GetAdminPageDataType = () => Promise<ResponseType<AdminPageDataType>>;



