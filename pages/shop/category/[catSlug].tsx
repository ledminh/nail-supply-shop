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



const CategoryPage:CategoryPageType = ({categories, selectedCategoryID, products}) => {
   
    const {handleCategoryChange, _products, _selectedCategory} = useCategoryPage(categories, products, '');


    return (
        <CategoryLayout 
            categories={categories}
            selectedCategoryID={_selectedCategory? _selectedCategory.id : null} 
            handleCategoryChange={handleCategoryChange}
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
    const { catSlug } = context.query;

    
    if(!catSlug) {
        return {
            response: ['error', 'No category slug found']
        }
    }

    if(Array.isArray(catSlug)) {
        return {
            response: ['error', 'Multiple category slug found']
        }
    }


    

    const response = await getCategoryPageData(catSlug);

    console.log(response);
    
    return {
        props: {
            response
        },
    };

}