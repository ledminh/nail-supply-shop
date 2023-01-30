export type SlugType = 'home' | 'shop' | 'about' | 'category' | 'product'| 'admin';

export type PageInfoType = {
    title: string;
    description: string;
    slug: SlugType;
    hide: true;
    getParent?: () => PageInfoType;
} |
{   title: string;
    description: string;
    slug: SlugType;
    hide?: false;
    path: string;
    getParent?: () => PageInfoType;
};

export type PageInfosType = Record<SlugType, PageInfoType>;

export const pageInfos: PageInfosType = {
    home: {
        title: 'Home',
        description: 'Nail Supply Shop',
        slug: 'home',
        path: '/'
    },
    shop: {
        title: 'Shop',
        description: 'Nail Supply Shop',
        slug: 'shop',
        path: '/shop'
    },
    about: {
        title: 'About',
        description: 'About Nail Supply Shop',
        slug: 'about',
        path: '/about'
    },

    category: {
        title: 'Category',
        description: 'Category Nail Supply Shop',
        slug: 'category',
        getParent: () => pageInfos.shop,
        hide: true
    },

    admin: {
        title: 'Admin',
        description: 'Admin Panel', 
        slug: 'admin',
        hide: true
    },

    product: {
        title: 'Product',
        description: 'Product of Nail Supply Shop',
        slug: 'product',
        getParent: () => pageInfos.shop,
        hide: true
    },
};