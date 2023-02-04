import { GetServerSidePropsContext } from 'next';

import styles from '../../../styles/Category.module.scss'

import { NextPageCustomized } from '../../_app';
import { CategoryPageDataType, getCategoryPageData } from '../../../database';

import CategoryLayout from '../../../layouts/CategoryLayout';

import ListLayout from '../../../layouts/ListLayout';
import ProductItem from '../../../components/category_components/ProductItem';

import { pageConfigs } from '../../../config';


import { CategoryType } from '../../../database';
import useCategoryPage from '../../../utils/category_page/hooks';

type CategoryDetailProps = CategoryPageDataType;

type CategoryPageType = NextPageCustomized<CategoryDetailProps>;

const CategoryPage:CategoryPageType = ({categories, currentCategoryID, products}) => {
   
    const {handleCategoryChange} = useCategoryPage();


    return (
        <CategoryLayout 
            categories={categories}
            selectedCategoryID={currentCategoryID} 
            handleCategoryChange={handleCategoryChange}
            >
                <ListLayout
                    wrapperClassName={styles.ul}
                    liClassName={styles.li}
                    renderItemBody={(product) => <ProductItem product={product}/>}
                    keyExtractor={(product) => product.id}
                    data={products.map((product) => ({
                        ...product,
                        url: `/product/${product.id}`,
                        }))}
                    />
        </CategoryLayout>
    );
}


export default CategoryPage;


CategoryPage.pageConfig = pageConfigs.shop;




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

    return {
        props: {
            response
        },
    };

}