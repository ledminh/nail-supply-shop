import { StaticImageData } from "next/image";

import homeHeroImage from './assets/images/homeHeroImage.jpg';
import aboutHeroImage from './assets/images/aboutHeroImage.jpg';
import shopHeroImage from './assets/images/shopHeroImage.jpg';

import _errorHeroImage from './assets/images/errorHeroImage.jpg';
import { SortConfigType } from "./database/types";

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
        onNav: true; // the properties below are for navigation
        name: string;
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
        heroImage: {
            image: shopHeroImage,
            alt: 'Nails polish bottles'
        },
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
        heroImage: {
            image: shopHeroImage,
            alt: 'Nails polish bottles'
        },
        getParent: () => pageConfigs.shop,
    },


    about: {
        name: "About",
        slug: 'about',
        heroImage: {
            image: aboutHeroImage,
            alt: 'Nail technicians are working' 
        },
        onNav: true,
        path: '/about',

    },

    

    admin: {
        slug: 'admin',
    },


};

export const errorHeroImage = {
    image: _errorHeroImage,
    alt: 'Error'
};


// being used in PriceFilter component
export type PriceRangeType = {
    min: number;
    max: number;
};

export const priceRanges:PriceRangeType[] = [
    { min: 0, max: 2 },
    { min: 2, max: 5 },
    { min: 5, max: 10 },
    { min: 10, max: 20 },
    { min: 20, max: 30 },
    { min: 30, max: 40 },
    { min: 40, max: 50 }
];

// being used in Sort component
export const defaultSortConfig:SortConfigType = {
    type: 'price',
    order: 'asc'
};


export const itemsPerPage = 10;