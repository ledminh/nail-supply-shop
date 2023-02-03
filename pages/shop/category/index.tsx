import { NextPageCustomized } from '../../_app';


import { pageConfigs } from '../../../config';

import CategoryLayout from '../../../layouts/CategoryLayout';

import { CategoryPageDataType, getCategoryPageData } from '../../../database';

import ListLayout from '../../../layouts/ListLayout';
import ProductItem from '../../../components/category_components/ProductItem';


type CategoryIndexProps = CategoryPageDataType;

type CategoryIndexPageType = NextPageCustomized<CategoryIndexProps>;




const CategoryIndexPage:CategoryIndexPageType = ({categories, products}) => {
    
    return (
        <CategoryLayout 
            categories={categories}
            selectedCategoryID={null}
            >
                <ListLayout
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