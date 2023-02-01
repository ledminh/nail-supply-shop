import { NextPageCustomized } from '../../_app';


import { pageConfigs } from '../../../config';

import CategoryLayout from '../../../layouts/CategoryLayout';

import { CategoryPageDataType, ResponseType, getCategoryPageData } from '../../../database';

import ProductList from '../../../components/category_components/ProductList';



type CategoryIndexProps = CategoryPageDataType;

type CategoryIndexPageType = NextPageCustomized<CategoryIndexProps>;




const CategoryIndexPage:CategoryIndexPageType = ({categories, products}) => {
    
    return (
        <CategoryLayout 
            categories={categories}
            selectedCategoryID={null}
            >
                <ProductList products={products} />
        </CategoryLayout>
    );
}


export default CategoryIndexPage;


CategoryIndexPage.pageConfig = pageConfigs.category;




export const getServerSideProps = async () => {
    
    const response = await getCategoryPageData();

    return {
        props: {
            response
        },
    };

}