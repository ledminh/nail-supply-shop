import { NextPageCustomized } from '../../_app';

import { GetServerSidePropsContext } from 'next';

import { pageConfigs } from '../../../config';
import styles from '../../../styles/Category.module.scss'


import CategoryLayout from '../../../layouts/CategoryLayout';

import { CategoryPageDataType, getCategoryPageData } from '../../../database';

import ListLayout from '../../../layouts/ListLayout';
import ProductItem from '../../../components/category_components/ProductItem';

import useCategoryPage from '../../../utils/category_page/hooks';

type CategoryIndexProps = CategoryPageDataType;

type CategoryIndexPageType = NextPageCustomized<CategoryIndexProps>;


/*
There are 2 paths to populate data for this page:
    1. If the page is rendered on the server, the data comes from the getServerSideProps function, goes through the useCategoryPage and is passed as it is to the rest of the page.
    2. If the user is already on the page and navigates to another category, the useCategoryPage hook will manipulate the data and pass it to the rest of the page.
It is kind of messy because I want the page's scroll position to be preserved when the user navigates to another category
*/


const CategoryIndexPage:CategoryIndexPageType = ({categories, products, priceRange}) => {
    
    const {handleCategoryChange, handlePriceChange, _products, _priceRange} = useCategoryPage(categories, products, '', priceRange);

    return (
        <CategoryLayout 
            categories={categories}
            selectedCategory={null}
            handleCategoryChange={handleCategoryChange}
            handlePriceChange={handlePriceChange}
            >
                <ListLayout
                    wrapperClassName={styles.ul}
                    liClassName={styles.li}
                    renderItemBody={(_product) => <ProductItem product={_product}/>}
                    keyExtractor={(_product) => _product.id}
                    data={_products.map((_product) => ({
                        ..._product,
                        url: `/product/${_product.id}`,
                        }))}
                    />
        </CategoryLayout>
    );
}


export default CategoryIndexPage;


CategoryIndexPage.pageConfig = pageConfigs.category;


export const getServerSideProps = async (context:GetServerSidePropsContext) => {
    const { priceMin, priceMax } = context.query;

    const response = await getCategoryPageData({
        price: priceMin && priceMax ? {
            min: Number(priceMin),
            max: Number(priceMax),
        } : undefined,
    });



    return {
        props: {
            response
        },
    };

}