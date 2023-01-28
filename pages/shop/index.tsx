import { ReactNode } from 'react';

import { getCategories, getSummaryProducts, ProductSummaryType, CategoryType, ResponseType } from '../../database';


import { useData } from '../../hooks/shop';
import ProductList from '../../components/shop_components/ProductList';
import HeroImage from '../../components/shop_components/HeroImage';


import { NextPageCustomized } from '../_app';
import { pageInfos } from '../../config';
import ShopLayout from '../../layouts/ShopLayout';


interface ShopProps {
  categoriesResponse: ResponseType<CategoryType[]>;
  productSummariesResponse: ResponseType<ProductSummaryType[]>;
}

// TODO: continue to refactor this page to shop/category/[catSlug].tsx

const Shop: NextPageCustomized<ShopProps> = ({categoriesResponse, productSummariesResponse}) => {
    
    const { errResponses, categories, products, handleCategoryChange, selectedCategoryID } = useData(categoriesResponse, productSummariesResponse);
    

    // this is for ErrorLayout on ShopLayout
    const responses = [categoriesResponse, productSummariesResponse, ...errResponses];

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
    const productSummariesResponse = await getSummaryProducts();  
    
    
    return {
        props: {
            categoriesResponse,
            productSummariesResponse,
        }
    }
}