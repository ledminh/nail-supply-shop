import React, { FC } from 'react';
import ErrorScreen from '../../components/ErrorScreen';
import Category from '../../components/admin_components/Category';
import HeroImage from '../../components/admin_components/HeroImage';
import Product from '../../components/admin_components/Product';
import Subtitles from '../../components/admin_components/Subtitles';
import About from '../../components/admin_components/About';

import styles from '../../styles/admin.module.scss';

import { CategoryType, ProductType, SubtitleType, getCategories, getProducts, ResponseType } from '../../database';


interface AdminProps {
  categoriesResponse: ResponseType<CategoryType[]>;
  productsResponse: ResponseType<ProductType[]>;
  subtitles: SubtitleType[];
  aboutHtmlText: string;  
}

const Admin: FC<AdminProps> = ({categoriesResponse, productsResponse, subtitles, aboutHtmlText}) => {

  const [catStatus, categories] = categoriesResponse;
  const [prodStatus, products] = productsResponse;

  
  if(catStatus !== 'success' || prodStatus !== 'success') {

    const errMessages = [];

    if(catStatus === 'error') errMessages.push(categories);
    if(prodStatus === 'error') errMessages.push(products);


    return (
      <ErrorScreen
        errMessages={errMessages}
        />
    )
  }
  

  return (
    <>
      <HeroImage/>
      <div className={styles.body}>
        <section className={styles.section}>
          <Category
            categories={categories}  
            />
        </section>
        <section className={styles.section}>
          <Product
            categories={categories}
            products={products}
            />
        </section>
        <section className={styles.section + ' ' + styles.full}>
          <Subtitles
            subtitles={subtitles}
            />
        </section>
        <section className={styles.section + ' ' + styles.full}>
          <About
            htmlText={aboutHtmlText}
            />
        </section>
      </div>
    </>
  ); 
}

export default Admin;


export const getServerSideProps = async () => {
  const categoriesResponse = await getCategories();
  const productsResponse = await getProducts();




  return {
    props: {
      categoriesResponse,
      productsResponse,
      aboutHtmlText: 'About Text',
      subtitles: [
        {
          id: 1,
          name: 'home',
          subtitle: 'Home Subtitle'
        },
        {
          id: 2,
          name: 'about',
          subtitle: 'About Subtitle'
        },
        {
          id: 3,
          name: 'shop',
          subtitle: 'Shop Subtitle'
        }
      ] 
    }
  }
}