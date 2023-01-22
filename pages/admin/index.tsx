import React, { FC } from 'react';
import Category from '../../components/admin_components/Category';
import HeroImage from '../../components/admin_components/HeroImage';
import Product from '../../components/admin_components/Product';

import styles from '../../styles/admin.module.scss';

import { CategoryType, getCategories } from '../../database';



interface AdminProps {
  categories: CategoryType[];
}

const Admin: FC<AdminProps> = ({categories}) => (
  <>
    <HeroImage/>
    <div className={styles.body}>
      <Category
        categories={categories}  
        />
      <Product/>
    </div>
  </>
);

export default Admin;


export const getServerSideProps = async () => {
  const categories = getCategories();

  return {
    props: {
      categories
    }
  }
}