import React, { FC } from 'react';
import Category from '../../components/admin_components/Category';
import HeroImage from '../../components/admin_components/HeroImage';
import Product from '../../components/admin_components/Product';
import Subtitles from '../../components/admin_components/Subtitles';

import styles from '../../styles/admin.module.scss';

import { CategoryType, ProductType, SubtitleType, getCategories, getProducts } from '../../database';


interface AdminProps {
  categories: CategoryType[];
  products: ProductType[];
  subtitles: SubtitleType[];
}

const Admin: FC<AdminProps> = ({categories, products, subtitles}) => (
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
      <section className={styles.section}>
        <Subtitles
          subtitles={subtitles}
          />
      </section>
    </div>
  </>
);

export default Admin;


export const getServerSideProps = async () => {
  const categories = getCategories();
  const products = getProducts();

  return {
    props: {
      categories,
      products,
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