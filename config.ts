import { StaticImageData } from "next/image";

import homeHeroImage from './assets/images/homeHeroImage.jpg';


export type SlugType = 'home' | 'shop' | 'about' | 'category' | 'product'| 'admin';


// determine page hierarchy and navigation structure
export type PageConfigType = {
    slug: SlugType;
    getParent?: () => PageConfigType;
    heroImage?: {
        image: StaticImageData,
        alt: string
    };
} & (
    {
        name: string;
        onNav: true;
        path: string;
    }
    | {
        onNav?: false;
    }
);


export type PageConfigsType = Record<SlugType, PageConfigType>;

export const pageConfigs: PageConfigsType = {
    home: {
        name: "Home",
        slug: 'home',
        heroImage: {
            image: homeHeroImage,
            alt: 'Nails are being painted'
        },
        onNav: true,
        path: '/',

    },
    shop: {
        name: "Shop",
        slug: 'shop',
        onNav: true,
        path: '/shop',

    },
    
    product: {
        name: "Product",
        slug: 'product',
        getParent: () => pageConfigs.shop,    
            
    },

    category: {
        slug: 'category',
        getParent: () => pageConfigs.shop,
    },


    about: {
        name: "About",
        slug: 'about',
        onNav: true,
        path: '/about',

    },

    

    admin: {
        slug: 'admin',
    },


};