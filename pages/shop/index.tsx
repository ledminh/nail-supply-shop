import { ReactNode } from 'react';

import { getCategories, getProducts, ProductType, CategoryType, ResponseType } from '../../database';


import { useData } from '../../hooks/shop';
import ProductList from '../../components/shop_components/ProductList';
import HeroImage from '../../components/shop_components/HeroImage';


import { NextPageCustomized } from '../_app';
import { pageInfos } from '../../config';
import ShopLayout from '../../layouts/ShopLayout';


interface ShopProps {
    categoriesResponse: ResponseType<CategoryType[]>;
    productsResponse: ResponseType<ProductType[]>;
}

const Shop: NextPageCustomized<ShopProps> = ({categoriesResponse, productsResponse}) => {
    
    const { categories, products, handleCategoryChange, selectedCategoryID } = useData(categoriesResponse, productsResponse);
    
    // this is for ErrorLayout on ShopLayout
    const responses = [categoriesResponse, productsResponse];

    return (
        <ShopLayout
            responses={responses}
            categories={categories}
            selectedCategoryID={selectedCategoryID}
            handleCategoryChange={handleCategoryChange}
            >
            <ProductList products={products}/>
        </ShopLayout>
    )
};

export default Shop;


/****************************
 * Customized page
 */
Shop.HeroImage = HeroImage;

Shop.pageInfo = pageInfos.shop;

/********************
 * SERVER SIDE PROPS
 */
export const getServerSideProps = async () => {
    const categoriesResponse = await getCategories();
    const productsResponse = await getProducts({limit: 20});  
    
    
    return {
        props: {
            categoriesResponse,
            productsResponse,
        }
    }
}