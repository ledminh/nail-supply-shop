

import { NextPageCustomized } from '../_app';
import { pageConfigs } from '../../config';

import { ShopPageDataType, getShopPageData } from '../../database';

import ListLayout from '../../layouts/ListLayout';
import CategoryItem from '../../components/shop_components/CategoryItem';
import AllCategories from '../../components/shop_components/AllCategories';



const Shop: NextPageCustomized<ShopPageDataType> = ({categories}) => {
    
    
    
    return (
        <>
            <ListLayout
                renderItemBody={(category) => (
                    <CategoryItem
                        category={category}
                        />
                )}
                keyExtractor={(category) => category.id}
                getItemName={(category) => category.name}
                getItemUrl={(category) => `/shop/category/${category.slug}`}
                getItemImageUrl={(category) => category.imageUrl}
                FirstItem= {{
                    name: 'All Products',
                    url: '/shop/category',
                    imageUrl: '/images/all-product-bground.jpg',
                    component: <AllCategories/>
                }}
                data={categories}
                />
        </>
    )
};

export default Shop;


/****************************
 * Customized page
 */
Shop.pageConfig = pageConfigs.shop;

/********************
 * SERVER SIDE PROPS
 */
export const getServerSideProps = async () => {
    
    const response = await getShopPageData();
    
    return {
        props: {
            response     
        }
    }
}