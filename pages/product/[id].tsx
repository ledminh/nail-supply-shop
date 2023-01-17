import React from 'react';

import { GetServerSidePropsContext } from 'next';

import Image from 'next/image';
import Image001JPG from '../../assets/images/samples/001.jpg';

import styles from '../../styles/Product.module.scss';

interface ProductDetailProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
  }
}

const Product = ({ product }: ProductDetailProps) => {
    return (
        <div className={styles.wrapper}>
            <h2 className={styles.name}>PRODUCT NAME</h2>
            <div className={styles.image}>
                <Image 
                    src={Image001JPG}
                    alt="Product Image"
                    fill
                    style={{objectFit: 'cover'}}
                />
            </div>
            <div className={styles.description}>
                <h4>Description</h4>
                <p>Something about the product</p>
            </div>
            <div className={styles.price}>
                <span className={styles.text}>Price:</span>
                <span className={styles.value}>$100</span>
            </div>
            <div className={styles.checkout}>
                <button>Add to Cart</button>
            </div>
        </div>
    );
}

export const getServerSideProps = async (context:GetServerSidePropsContext) => {
  const { id } = context.query;
  
  return {
    props: {
      product: {
        id: id
      }
    },
  };
}

export default Product;