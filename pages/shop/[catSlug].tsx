import { GetServerSidePropsContext } from 'next';

import { NextPageCustomized } from '../_app';

interface CategoryDetailProps {    
    catSlug: string;
}

type CategoryPageType = NextPageCustomized<CategoryDetailProps>;

const Product:CategoryPageType = ({catSlug}) => {
    
    
    return (
        <>catSlug</>

    );
}


export default Product;




export const getServerSideProps = async (context:GetServerSidePropsContext) => {
    const { catSlug } = context.query;



    return {
        props: {
            catSlug,
        },
    };

}