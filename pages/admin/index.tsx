import React, { FC } from 'react';
import Category from '../../components/admin_components/Category';
import HeroImage from '../../components/admin_components/HeroImage';
import Product from '../../components/admin_components/Product';

import styles from '../../styles/admin.module.scss';

import { CategoryType, ProductType, getCategories, getProducts } from '../../database';



interface AdminProps {
  categories: CategoryType[];
  products: ProductType[];
}

const Admin: FC<AdminProps> = ({categories, products}) => (
  <>
    <HeroImage/>
    <div className={styles.body}>
      <div className={styles.category}>
        <Category
          categories={categories}  
          />
      </div>
      <div className={styles.product}>
        <Product
          products={products}
          />
      </div>
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
      products
    }
  }
}