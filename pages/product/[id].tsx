import {FC} from 'react';

import { GetServerSidePropsContext } from 'next';

import Image from 'next/image';

import styles from '../../styles/Product.module.scss';
import { getProductById, ProductType, ResponseType } from '../../database';
import ErrorScreen from '../../components/ErrorScreen';

interface ProductDetailProps {
    productResponse: ResponseType<ProductType>;
}

type ProductPageType = FC<ProductDetailProps>;

const Product:ProductPageType = ({ productResponse }) => {
    
    const [status, product] = productResponse;

    if(status === 'error') {
        return (
            <ErrorScreen
                errMessages={[product]}
                />        
        );
    }
    
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
  
    const productResponse = await getProductById(id as string);

    return {
        props: {
            productResponse: productResponse
        },
    };

}

export default Product;