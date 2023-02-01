

import { NextPageCustomized } from '../_app';
import { pageConfigs } from '../../config';

import { ShopPageDataType, getShopPageData } from '../../database';

import Link from 'next/link';


// TODO: style this page

const Shop: NextPageCustomized<ShopPageDataType> = ({categories}) => {
    
    
    return (
        <>
            <h2>Category List</h2>
            {
                categories.map((cat) => {
                    return (
                        <Link key={cat.id}
                            href={`/shop/category/${cat.slug}`}
                            >
                            <h3>{cat.name}</h3>
                            <p>{cat.description}</p>
                        </Link>
                    )
                })
            }
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