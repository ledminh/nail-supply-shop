import React, { FC } from 'react';
import Category from '../../components/admin_components/Category';
import HeroImage from '../../components/admin_components/HeroImage';
import Product from '../../components/admin_components/Product';

import styles from '../../styles/admin.module.scss';

import { CategoryInfoType, getCategoryInfos } from '../../database';



interface AdminProps {
  categoryInfos: CategoryInfoType[];
}

const Admin: FC<AdminProps> = ({categoryInfos}) => (
  <>
    <HeroImage/>
    <div className={styles.body}>
      <Category
        categoryInfos={categoryInfos}  
        />
      <Product/>
    </div>
  </>
);

export default Admin;


export const getServerSideProps = async () => {
  const categoryInfos = getCategoryInfos();

  return {
    props: {
      categoryInfos
    }
  }
}