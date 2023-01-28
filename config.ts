export type SlugType = 'home' | 'shop' | 'about' | 'admin';

export interface PageInfoType {
    title: string;
    description: string;
    slug: SlugType;
    url: string;
    hide?: boolean;
}

export type PageInfosType = Record<SlugType, PageInfoType>;

export const pageInfos: PageInfosType = {
    home: {
        title: 'Home',
        description: 'Nail Supply Shop',
        slug: 'home',
        url: '/'
    },
    shop: {
        title: 'Shop',
        description: 'Nail Supply Shop',
        slug: 'shop',
        url: '/shop'
    },
    about: {
        title: 'About',
        description: 'About Nail Supply Shop',
        slug: 'about',
        url: '/about'
    },
    admin: {
        title: 'Admin',
        description: 'Admin Panel', 
        slug: 'admin',
        url: '/admin',
        hide: true
    }
};