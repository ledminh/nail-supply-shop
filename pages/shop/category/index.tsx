import { NextPageCustomized } from '../../_app';


import HeroImage from '../../../components/shop_components/HeroImage';
import { pageInfos } from '../../../config';

import CategoryLayout from '../../../layouts/CategoryLayout';

import { CategoryPageDataType, ResponseType, getCategoryPageData } from '../../../database';

import ProductList from '../../../components/category_components/ProductList';



interface CategoryIndexProps {
    response: ResponseType<CategoryPageDataType>;
}

type CategoryIndexPageType = NextPageCustomized<CategoryIndexProps>;




const CategoryIndexPage:CategoryIndexPageType = ({response}) => {
    
    const [status, data] = response;

    return (
        <CategoryLayout 
            responses={[response]}
            categories={status === 'success' ? data.categories : []}
            selectedCategoryID={null}
            >
                {
                    status === 'success' && <ProductList products={data.products} /> 
                }

        </CategoryLayout>
    );
}


export default CategoryIndexPage;


// TODO: this HeroImage is from shop_components, change it to category_components
CategoryIndexPage.HeroImage = HeroImage;
CategoryIndexPage.pageInfo = pageInfos.category;




export const getServerSideProps = async () => {
    
    const response = await getCategoryPageData();

    return {
        props: {
            response
        },
    };

}