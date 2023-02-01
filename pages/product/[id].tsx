import { GetServerSidePropsContext } from 'next';

import Image from 'next/image';
import Head from 'next/head';

import styles from '../../styles/Product.module.scss';
import { getProductPageData, ProductPageDataType } from '../../database';
import { NextPageCustomized } from '../_app';
import { pageConfigs } from '../../config';

type ProductDetailProps = ProductPageDataType;

type ProductPageType = NextPageCustomized<ProductDetailProps>;

const Product:ProductPageType = ({ product }) => {
    
    return (
        <div className={styles.wrapper}>
            <h2 className={styles.name}>{product.name}</h2>
            <div className={styles.image}>
                <Image 
                    src={product.imageUrl}
                    alt="Product Image"
                    fill
                    style={{objectFit: 'cover'}}
                />
            </div>
            <div className={styles.description}>
                <h4>Description</h4>
                <p>{product.fullDescription}</p>
            </div>
            <div className={styles.price}>
                <span className={styles.text}>Price:</span>
                <span className={styles.value}>${product.price}</span>
            </div>
            <div className={styles.checkout}>
                <button>Add to Cart</button>
            </div>
        </div>
    );
}


export default Product;

Product.pageConfig = pageConfigs.product;



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
    

    const response = await getProductPageData(id);

    return {
        props: {
            response
        },
    };

}