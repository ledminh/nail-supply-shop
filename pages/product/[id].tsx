import {FC} from 'react';

import { GetServerSidePropsContext } from 'next';

import Image from 'next/image';

import styles from '../../styles/Product.module.scss';
import { getProductById, ProductType, ResponseType } from '../../database';
import ErrorLayout from '../../layouts/ErrorLayout';

interface ProductDetailProps {
    productResponse: ResponseType<ProductType>;
}

type ProductPageType = FC<ProductDetailProps>;

const Product:ProductPageType = ({ productResponse }) => {
    
    // when status === 'error', the handling is done in ErrorLayout
    const [status, product] = productResponse;
    
    return (
        <div className={styles.wrapper}>
            <ErrorLayout
                responses={[productResponse]}
                >
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
                    <p>{(product as ProductType).description}</p>
                </div>
                <div className={styles.price}>
                    <span className={styles.text}>Price:</span>
                    <span className={styles.value}>${(product as ProductType).price}</span>
                </div>
                <div className={styles.checkout}>
                    <button>Add to Cart</button>
                </div>
            </ErrorLayout>
        </div>
    );
}

export const getServerSideProps = async (context:GetServerSidePropsContext) => {
    const { id } = context.query;
  
    const productResponse = await getProductById(id as string);

    return {
        props: {
            productResponse: productResponse
        },
    };

}

export default Product;