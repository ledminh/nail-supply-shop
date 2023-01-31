export type SlugType = 'home' | 'shop' | 'about' | 'category' | 'product'| 'admin';

export type PageInfoType = {
    title: string;
    description: string;
    slug: SlugType;
    onNav?: false;
    getParent?: () => PageInfoType;
} |
{   title: string;
    description: string;
    slug: SlugType;
    onNav: true;
    path: string;
    getParent?: () => PageInfoType;
};

export type PageInfosType = Record<SlugType, PageInfoType>;

export const pageInfos: PageInfosType = {
    home: {
        title: 'Home',
        description: 'Nail Supply Shop',
        slug: 'home',
        onNav: true,
        path: '/'
    },
    shop: {
        title: 'Shop',
        description: 'Nail Supply Shop',
        slug: 'shop',
        onNav: true,
        path: '/shop'
    },
    about: {
        title: 'About',
        description: 'About Nail Supply Shop',
        slug: 'about',
        onNav: true,
        path: '/about'
    },

    category: {
        title: 'Category',
        description: 'Category Nail Supply Shop',
        slug: 'category',
        getParent: () => pageInfos.shop,
    },

    admin: {
        title: 'Admin',
        description: 'Admin Panel', 
        slug: 'admin',
    },

    product: {
        title: 'Product',
        description: 'Product of Nail Supply Shop',
        slug: 'product',
        getParent: () => pageInfos.shop,
        
    },
};