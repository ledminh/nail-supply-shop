import HeroImage from '../../components/shop_components/HeroImage';


import { NextPageCustomized } from '../_app';
import { pageInfos } from '../../config';
import ErrorLayout from '../../layouts/ErrorLayout';

import { ResponseType, ShopPageDataType, getShopPageData } from '../../database';

import Link from 'next/link';


interface ShopProps {
    response: ResponseType<ShopPageDataType>;
}

// TODO: style this page

const Shop: NextPageCustomized<ShopProps> = ({response}) => {
    
    
    return (
        <ErrorLayout
            responses={[response]}
            >
            <h2>Category List</h2>
            {
                response[0] === 'success' && response[1].categories.map((cat) => {
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
        </ErrorLayout>
    )
};

export default Shop;


/****************************
 * Customized page
 */
Shop.HeroImage = HeroImage;
Shop.pageInfo = pageInfos.shop;

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