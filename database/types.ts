import { CategoryToAdd, CategoryToUpdate, ProductToAdd } from "../admin/types";

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

export type DBProductImageType = {
    url: string;
    alt?: string;
    default?: boolean;
};

export type DBProductType = {
    categoryID: string;
    id: string;
    name: string;
    shortDescription: string;
    fullDescription: string;
    price: number;
    images: DBProductImageType[];
    date: string;
    sellCount: number;
};

export type DBProductGroupType = (DBProductType & {
    mainProduct?: boolean;
    variantName: string;
})[];

export type DBPageInfoType = {
    id: string,
    title: string;
    description?: string;
    subtitle?: string;
    heroImage?: {
        image: string,
        alt: string
    };
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
export type ProductGroupType = DBProductGroupType;
export type PageInfoType = DBPageInfoType;

    // Data types for pages

// base type for all page data types
type PageDataType = {
    pageInfo: PageInfoType;
}


export type HomePageDataType = PageDataType & {
    newArrivalProducts: (ProductType|ProductGroupType)[];
    bestSellerProducts: (ProductType|ProductGroupType)[];
};

export type AboutPageDataType = PageDataType & {
    aboutHtmlText: string;
};

export type CategoryPageDataType = PageDataType & {
    selectedCategoryID: string | null; 
    categories: CategoryType[];
    priceRange: {
        min: number;
        max: number;
    } | null;
    currentSort: SortConfigType|null;
};

export type ShopPageDataType =  PageDataType &{
    categories: CategoryType[];
}

export type ProductPageDataType = PageDataType & {
    product: ProductType|ProductGroupType;
}

export type AdminPageDataType = PageDataType & {
    categories: CategoryType[];
    products: (ProductType|ProductGroupType)[];
    aboutHtmlText: string;
}; 


/*********************************************
 * Database functions
 * -------------------------------------------
 * Functions from *DB.ts, which are called 
 * by the functions in index.tsx and directly work 
 * with the database. Should be implemented 
 * differently for different databases.
 */


export type GetDBCategoriesType = () => Promise<DBCategoryType[]>;

export type AddDBCategoryType = (newCategory: CategoryToAdd) => Promise<DBCategoryType>;

export type DeleteDBCategoryType = (id: string) => Promise<string>;

export type UpdateDBCategoryType = (category: CategoryToUpdate) => Promise<DBCategoryType>;

export type AddDBProductType = (newProduct: ProductToAdd) => Promise<DBProductType>;

type ProductOptionsType = {
    limit?: number;
    offset?: number;
    price?: {
        min: number;
        max: number;
    };
    categoryID?: string;
    sort?: SortConfigType;
};

type DBProductsResponseType = {
    products: (DBProductType|DBProductGroupType)[];
    total: number;
}

export type GetDBProductsType = (options:ProductOptionsType) => Promise<DBProductsResponseType>;

export type GetDBProductType = (id: string) => Promise<DBProductType|DBProductGroupType>;

export type GetDBPageInfoType = (title: 'Home' | 'About' | 'Shop') => Promise<DBPageInfoType>;

export type GetDBAboutHtmlTextType = () => Promise<string>;

/*********************************************
 *  API functions
 * -------------------------------------------
 * Functions in index.ts, which are called 
 * by client code (frontend). 
 */


export type GetCategoriesType = () => Promise<ResponseType<CategoryType[]>>;

export type AddCategoryType = (category: CategoryToAdd) => Promise<ResponseType<CategoryType>>;

export type DeleteCategoryType = (id: string) => Promise<ResponseType<string>>;

export type UpdateCategoryType = (category: CategoryToUpdate) => Promise<ResponseType<CategoryType>>;


export type GetProductsType = (options: ProductOptionsType) => Promise<ResponseType<DBProductsResponseType>>;

export type GetProductType = (id: string) => Promise<ResponseType<ProductType|ProductGroupType>>;

export type AddProductType = (product: ProductToAdd) => Promise<ResponseType<ProductType>>;


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
type GetCategoryPageOptionsType = {
    categorySlug?: string;
    price?: {
        min: number;
        max: number;
    };
    sort?: SortConfigType;
}
export type GetCategoryPageDataType = (options:GetCategoryPageOptionsType) => Promise<ResponseType<CategoryPageDataType>>;

    // fetches data for shop page
export type GetShopPageDataType = () => Promise<ResponseType<ShopPageDataType>>;

    // fetches data for product page
export type GetProductPageDataType = (productID: string) => Promise<ResponseType<ProductPageDataType>>;

    // fetches data for admin page
export type GetAdminPageDataType = () => Promise<ResponseType<AdminPageDataType>>;


/*********************************************
 *  Other types
 * ------------------------------------------- 
 */

    //-------------------------------------
    // Types for sorting products, which is 
    // used in components/category_components/Sort.
    // They are put here because they are also used
    // in database.

export type SortType = 'price' | 'name' | 'date' | 'sellCount';
export type SortOrderType = 'asc' | 'desc';

export type SortConfigType = {
    type: SortType;
    order: SortOrderType;
};