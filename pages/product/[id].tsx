import React from 'react';

import { GetServerSidePropsContext } from 'next';

import Image from 'next/image';
import Image001JPG from '../../assets/images/samples/001.jpg';

import styles from '../../styles/Product.module.scss';
import { getProductById, ProductType } from '../../database';

interface ProductDetailProps {
    data: ['success'|'error', ProductType]
}

const Product = ({ data }: ProductDetailProps) => {
    
    if(data[0] === 'error') {
        return (
            <div>
                <h3>Product Not Found</h3>
            </div>
        );
    }
    
    const product = data[1];
    
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
                <p>{product.description}</p>
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

export const getServerSideProps = async (context:GetServerSidePropsContext) => {
    const { id } = context.query;
  
    try {
        const product = getProductById(id as string);
        return {
            props: {
                data: ['success', product]
            },
        };

    }
    catch (error) {
        return {
            props: {
                data: ['error', null]
            },
        };
    }

}

export default Product;