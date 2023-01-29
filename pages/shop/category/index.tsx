import { NextPageCustomized } from '../../_app';


import HeroImage from '../../../components/shop_components/HeroImage';
import { pageInfos } from '../../../config';

import CategoryLayout from '../../../layouts/CategoryLayout';

import { CategoryPageDataType, ResponseType, getCategoryPageData } from '../../../database';

import ProductList from '../../../components/shop_components/ProductList';

import { useRouter } from 'next/router';


interface CategoryIndexProps {
    response: ResponseType<CategoryPageDataType>;
}

type CategoryIndexPageType = NextPageCustomized<CategoryIndexProps>;




const CategoryIndexPage:CategoryIndexPageType = ({response}) => {
    
    const [status, data] = response;
   
    const responses = [response];    

    const router = useRouter();

    
    return (
        <CategoryLayout 
            responses={responses}
            categories={(data as CategoryPageDataType).categories}
            selectedCategoryID={null} 
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


export default CategoryIndexPage;

CategoryIndexPage.HeroImage = HeroImage;
CategoryIndexPage.pageInfo = pageInfos.shop;




export const getServerSideProps = async () => {
    
    const response = await getCategoryPageData();

    return {
        props: {
            response
        },
    };

}