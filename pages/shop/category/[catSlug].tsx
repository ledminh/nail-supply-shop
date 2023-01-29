import { GetServerSidePropsContext } from 'next';

import { NextPageCustomized } from '../../_app';
import { ResponseType, CategoryPageDataType, CategoryType, getCategoryPageData } from '../../../database';

import CategoryLayout from '../../../layouts/CategoryLayout';

import { useRouter } from 'next/router';
import ProductList from '../../../components/shop_components/ProductList';

import HeroImage from '../../../components/shop_components/HeroImage';
import { pageInfos } from '../../../config';

interface CategoryDetailProps {    
    response: ResponseType<CategoryPageDataType>;
}

type CategoryPageType = NextPageCustomized<CategoryDetailProps>;

const CategoryPage:CategoryPageType = ({response}) => {
    const [status, data] = response;
   
    const responses = [response];    

    const router = useRouter();

    return (
        <CategoryLayout 
            responses={responses}
            categories={(data as CategoryPageDataType).categories}
            selectedCategoryID={(data as CategoryPageDataType).currentCategoryID} 
            handleCategoryChange={(currentCat) => {
                if(!currentCat) {
                    router.push('/shop/category');
                }
                else {
                    router.push(`/shop/category/${currentCat.slug}`);
                }
            }}
            >
                <ProductList products={(data as CategoryPageDataType).products} />
        </CategoryLayout>

    );
}


export default CategoryPage;


CategoryPage.HeroImage = HeroImage;
CategoryPage.pageInfo = pageInfos.shop;




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