import { GetServerSidePropsContext } from 'next';

import Images  from '../../components/product_components/Images';
import styles from '../../styles/Product.module.scss';
import { getProductPageData, ProductPageDataType } from '../../database';
import { NextPageCustomized } from '../_app';
import { pageConfigs } from '../../config';

import { useEffect, useState } from 'react';
import { DBProductType } from '../../database/types';
import useProduct from '../../utils/product_page/hooks';

type ProductDetailProps = ProductPageDataType;

type ProductPageType = NextPageCustomized<ProductDetailProps>;

const Product:ProductPageType = ({ product }) => {
    
    const {_product, currentVariantName, variationOnChange} = useProduct(product);

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.name}>{_product.name + (currentVariantName? ' :: ' + currentVariantName: '')}</h2>
            <div className={styles.images}>
                <Images 
                    images={_product.images}
                    productName={_product.name}
                    
                    />
            </div>
            <div className={styles.description}>
                <h4 className={styles.title}>Description</h4>
                <div className={styles.content}>
                    <p>{_product.fullDescription}</p>
                    {
                        Array.isArray(product) && (
                            <form>
                                <label htmlFor="variations">Variation:</label>
                                <select name="variations" 
                                        id="variations"
                                        onChange={variationOnChange}
                                        >
                                    {
                                        product.map(p => (
                                            <option key={p.id} value={p.id}>{p.variantName}</option>
                                        ))
                                    }
                                </select>
                            </form>
                        ) 
                    }
                </div>
            </div>
            <div className={styles.price}>
                <span className={styles.text}>Price:</span>
                <span className={styles.value}>${_product.price}</span>
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