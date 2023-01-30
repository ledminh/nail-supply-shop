import { GetServerSidePropsContext } from 'next';

import Image from 'next/image';

import styles from '../../styles/Product.module.scss';
import { getProduct, ProductType, ResponseType } from '../../database';
import ErrorLayout from '../../layouts/ErrorLayout';
import { NextPageCustomized } from '../_app';
import { pageInfos } from '../../config';

interface ProductDetailProps {
    productResponse: ResponseType<ProductType>;
}

type ProductPageType = NextPageCustomized<ProductDetailProps>;

const Product:ProductPageType = ({ productResponse }) => {
    
    // when status === 'error', the handling is done in ErrorLayout
    const [status, product] = productResponse;
    
    return (
        <ErrorLayout
            responses={[productResponse]}
            >
            <div className={styles.wrapper}>
                <h2 className={styles.name}>{(product as ProductType).name}</h2>
                <div className={styles.image}>
                    <Image 
                        src={(product as ProductType).imageUrl}
                        alt="Product Image"
                        fill
                        style={{objectFit: 'cover'}}
                    />
                </div>
                <div className={styles.description}>
                    <h4>Description</h4>
                    <p>{(product as ProductType).fullDescription}</p>
                </div>
                <div className={styles.price}>
                    <span className={styles.text}>Price:</span>
                    <span className={styles.value}>${(product as ProductType).price}</span>
                </div>
                <div className={styles.checkout}>
                    <button>Add to Cart</button>
                </div>
            </div>
        </ErrorLayout>
    );
}


export default Product;

Product.pageInfo = pageInfos.product;



export const getServerSideProps = async (context:GetServerSidePropsContext) => {
    const { id } = context.query;
  
    if(!id) {
        return {
            props: {
                productResponse: ['error', 'No product id provided']
            },
        };
    }
    
    if(Array.isArray(id)) {
        return {
            props: {
                productResponse: ['error', 'Multiple product ids provided']
            },
        };
    }

    if(id.length === 0) {
        return {
            props: {
                productResponse: ['error', 'Empty product id provided']
            },
        };
    }
    

    const productResponse = await getProduct(id);

    return {
        props: {
            productResponse: productResponse
        },
    };

}