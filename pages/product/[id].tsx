import { GetServerSidePropsContext } from 'next';

import Images  from '../../components/product_components/Images';
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
            <div className={styles.images}>
                <Images 
                    images={product.images}
                    productName={product.name}
                    
                    />
            </div>
            <div className={styles.description}>
                <h4 className={styles.title}>Description</h4>
                <div className={styles.content}>
                    <p>{product.fullDescription}</p>
                </div>
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