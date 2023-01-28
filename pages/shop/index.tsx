import { FC, ReactNode } from 'react';
import SelectionPanel from '../../components/shop_components/SelectionPanel';
import { getCategories, getSummaryProducts, ProductSummaryType, CategoryType, ResponseType } from '../../database';

import styles from '../../styles/Shop.module.scss';

import { useData } from '../../hooks/shop';
import ProductList from '../../components/shop_components/ProductList';
import HeroImage from '../../components/shop_components/HeroImage';

import PriceFilter from '../../components/shop_components/PriceFilter';
import Sort from '../../components/shop_components/Sort';

import { NextPageCustomized } from '../_app';
import { pageInfos } from '../../config';
import ShopLayout from '../../layouts/ShopLayout';


interface ShopProps {
  categoriesResponse: ResponseType<CategoryType[]>;
  productSummariesResponse: ResponseType<ProductSummaryType[]>;
}

const Shop: NextPageCustomized<ShopProps> = ({categoriesResponse, productSummariesResponse}) => {
    const { errResponses, categories, products, handleCategoryChange, selectedCategoryID } = useData(categoriesResponse, productSummariesResponse);
    

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
Shop.getLayout = (page: ReactNode) => {
    return (
        <>
        <HeroImage />
        {page}
        </>
    )
}

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