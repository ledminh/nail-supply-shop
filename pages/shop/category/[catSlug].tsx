import { GetServerSidePropsContext } from 'next';

import styles from '../../../styles/Category.module.scss'

import { NextPageCustomized } from '../../_app';
import { CategoryPageDataType, getCategoryPageData } from '../../../database';

import CategoryLayout from '../../../layouts/CategoryLayout';

import ListLayout from '../../../layouts/ListLayout';
import ProductItem from '../../../components/category_components/ProductItem';

import { pageConfigs } from '../../../config';


import useCategoryPage from '../../../utils/category_page/hooks';

type CategoryDetailProps = CategoryPageDataType;

type CategoryPageType = NextPageCustomized<CategoryDetailProps>;



/*
There are 2 paths to populate data for this page:
    1. If the page is rendered on the server, the data comes from the getServerSideProps function, goes through the useCategoryPage and is passed as it is to the rest of the page.
    2. If the user is already on the page and navigates to another category, the useCategoryPage hook will manipulate the data and pass it to the rest of the page.
It is kind of messy because I want the page's scroll position to be preserved when the user navigates to another category
*/



const CategoryPage:CategoryPageType = ({categories, products, selectedCategoryID, priceRange}) => {

    const {handleCategoryChange, handlePriceChange, 
            _products, _selectedCategory, _priceRange} 
                = useCategoryPage(categories, products, selectedCategoryID, priceRange);


    return (
        <CategoryLayout 
            categories={categories}
            selectedCategory={_selectedCategory} 
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


export default CategoryPage;


CategoryPage.pageConfig = pageConfigs.category;




export const getServerSideProps = async (context:GetServerSidePropsContext) => {
    const { catSlug, priceMin, priceMax } = context.query;

    
    if(Array.isArray(catSlug)) {
        return {
            response: ['error', 'Multiple category slug found']
        }
    }


    const response = await getCategoryPageData({
        categorySlug: catSlug,
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