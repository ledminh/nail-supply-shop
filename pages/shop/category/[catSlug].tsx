import { GetServerSidePropsContext } from 'next';

import styles from '../../../styles/Category.module.scss'

import { NextPageCustomized } from '../../_app';
import { CategoryPageDataType, getCategoryPageData } from '../../../database';

import CategoryLayout from '../../../layouts/CategoryLayout';

import ListLayout from '../../../layouts/ListLayout';
import ProductItem from '../../../components/category_components/ProductItem';
import MoreButton from '../../../components/category_components/MoreButton';

import { pageConfigs } from '../../../config';


import { SortOrderType, SortType } from '../../../database/types';

import useCategoryPage from '../../../utils/category_page/hooks';

type CategoryDetailProps = CategoryPageDataType;

type CategoryPageType = NextPageCustomized<CategoryDetailProps>;



/*
There are 2 paths to populate data for this page:
    1. If the page is rendered on the server, the data comes from the getServerSideProps function, goes through the useCategoryPage and is passed as it is to the rest of the page.
    2. If the user is already on the page and navigates to another category, the useCategoryPage hook will manipulate the data and pass it to the rest of the page.
It is kind of messy because I want the page's scroll position to be preserved when the user navigates to another category
*/



const CategoryPage:CategoryPageType = ({categories,  selectedCategoryID, priceRange, currentSort}) => {

    const {handleCategoryChange, handlePriceChange,
            handleSortChange,
            _products, _selectedCategory, _priceRange, _currentSort, moreButtonOnClick, hasMore} 
                = useCategoryPage(categories, selectedCategoryID, priceRange, currentSort);

    const MoreBtn = <MoreButton onClick={moreButtonOnClick}/>;
    
    return (
        <CategoryLayout 
            categories={categories}
            selectedCategory={_selectedCategory} 
            handleCategoryChange={handleCategoryChange}
            handlePriceChange={handlePriceChange}
            handleSortChange={handleSortChange}
            currentPriceRange={_priceRange}
            currentSort={_currentSort}
            >
                <ListLayout
                    wrapperClassName={styles.ul}
                    liClassName={styles.li}
                    LastItem={hasMore? {
                        component: MoreBtn,
                        name: 'More Button'
                    }: undefined}
                    renderItemBody={(_product) => <ProductItem product={_product}/>}
                    keyExtractor={(_product) => _product.id}
                    data={_products.map((_product) => ({
                        ..._product,
                        url: `/product/${_product.id}`,
                        imageUrl: _product.images[_product.images.findIndex(img => img.default)].url,
                        }))}
                    />
        </CategoryLayout>
    );
}


export default CategoryPage;


CategoryPage.pageConfig = pageConfigs.category;




export const getServerSideProps = async (context:GetServerSidePropsContext) => {
    const { catSlug, priceMin, priceMax, sortType, sortOrder } = context.query;

    
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