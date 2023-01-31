import { GetServerSidePropsContext } from 'next';

import { NextPageCustomized } from '../../_app';
import { ResponseType, CategoryPageDataType, getCategoryPageData } from '../../../database';

import CategoryLayout from '../../../layouts/CategoryLayout';

import ProductList from '../../../components/category_components/ProductList';

import { pageConfigs } from '../../../config';

interface CategoryDetailProps {    
    response: ResponseType<CategoryPageDataType>;
}

type CategoryPageType = NextPageCustomized<CategoryDetailProps>;

const CategoryPage:CategoryPageType = ({response}) => {
    const [status, data] = response;
   

    return (
        <CategoryLayout 
            responses={[response]}
            categories={status === 'success' ? data.categories : []}
            selectedCategoryID={(data as CategoryPageDataType).currentCategoryID} 
            >
                {
                    status === 'success' && <ProductList products={data.products} /> 
                }
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