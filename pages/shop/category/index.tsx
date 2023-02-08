import { GetServerSidePropsContext } from 'next';

import styles from '../../../styles/Category.module.scss'

import { NextPageCustomized } from '../../_app';
import { CategoryPageDataType, getCategoryPageData } from '../../../database';

import CategoryLayout from '../../../layouts/CategoryLayout';

import ListLayout from '../../../layouts/ListLayout';
import ProductItem from '../../../components/category_components/ProductItem';

import MoreButton from '../../../components/category_components/MoreButton';

import { pageConfigs } from '../../../config';

import getMainProduct from '../../../utils/category_page/getMainProduct';


import useCategoryPage from '../../../utils/category_page/hooks';
import { SortOrderType, SortType } from '../../../database/types';

type CategoryDetailProps = CategoryPageDataType;

type CategoryPageType = NextPageCustomized<CategoryDetailProps>;



/*
There are 2 paths to populate data for this page:
    1. If the page is rendered on the server, the data comes from the getServerSideProps function, goes through the useCategoryPage and is passed as it is to the rest of the page.
    2. If the user is already on the page and navigates to another category, the useCategoryPage hook will manipulate the data and pass it to the rest of the page.
It is kind of messy because I want the page's scroll position to be preserved when the user navigates to another category
*/



const CategoryPage:CategoryPageType = ({categories, selectedCategoryID, priceRange, currentSort}) => {

    const {handleCategoryChange, handlePriceChange,
            handleSortChange, _currentSort,
            _products, _selectedCategory, _priceRange, moreButtonOnClick, hasMore} 
                = useCategoryPage(categories, selectedCategoryID, priceRange, currentSort);

    const MoreBtn = <MoreButton onClick={moreButtonOnClick}/>;

    return (
        <CategoryLayout 
            categories={categories}
            selectedCategory={_selectedCategory} 
            handleCategoryChange={handleCategoryChange}
            handlePriceChange={handlePriceChange}
            currentPriceRange={_priceRange}
            handleSortChange={handleSortChange}
            currentSort={_currentSort}
            >
                <ListLayout
                    wrapperClassName={styles.ul}
                    liClassName={styles.li}
                    LastItem={hasMore? {
                        component: MoreBtn,
                        name: 'More Button'
                    }: undefined}
                    renderItemBody={(_product) => <ProductItem product={getMainProduct(_product)}/>}
                    keyExtractor={(_product) => getMainProduct(_product).id}
                    getItemName={(_product) => getMainProduct(_product).name}
                    getItemUrl={(_product) => `/product/${getMainProduct(_product).id}`}
                    getItemImageUrl={(_product) => {
                        const mainProduct = getMainProduct(_product);
                        
                        return mainProduct.images[mainProduct.images.findIndex(p => p.default)].url;
                    }}



                    data={_products}
                    />
        </CategoryLayout>
    );
}


export default CategoryPage;


CategoryPage.pageConfig = pageConfigs.category;




export const getServerSideProps = async (context:GetServerSidePropsContext) => {
    const { priceMin, priceMax, sortType, sortOrder } = context.query;



    const response = await getCategoryPageData({
        price: priceMin && priceMax ? {
            min: Number(priceMin),
            max: Number(priceMax),
        } : undefined,
        sort: sortType && sortOrder ? {
            type: sortType as SortType,
            order: sortOrder as SortOrderType,
        } : undefined,
    });

    
    return {
        props: {
            response
        },
    };

}