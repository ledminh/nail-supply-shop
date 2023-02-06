

import { NextPageCustomized } from '../_app';
import { pageConfigs } from '../../config';

import { ShopPageDataType, getShopPageData } from '../../database';

import ListLayout from '../../layouts/ListLayout';
import CategoryItem from '../../components/shop_components/CategoryItem';



const Shop: NextPageCustomized<ShopPageDataType> = ({categories}) => {
    
    
    return (
        <>
            <h2>Category List</h2>
            <ListLayout
                renderItemBody={(category) => (
                    <CategoryItem
                        category={category}
                        />
                )}
                keyExtractor={(category) => category.id}
                data={[{
                    id: 'all',
                    name: 'All',
                    description: 'All products',
                    slug: '',
                    imageUrl: '/images/all-product-bground.jpg'
                },
                    ...categories].map((category) => ({
                    ...category,
                    url: category.name === 'All'? `shop/category` : `/shop/category/${category.slug}`,
                    }))
                }
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