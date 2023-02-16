import { useState } from 'react';
import Category from '../../components/admin_components/Category';
import Product from '../../components/admin_components/Product';
import Subtitles from '../../components/admin_components/Subtitles';
import About from '../../components/admin_components/About';

import styles from '../../styles/admin.module.scss';


import {getAdminPageData, AdminPageDataType } from '../../database';

import { NextPageCustomized } from '../_app';
import { pageConfigs } from '../../config';
import Modals from '../../components/admin_components/Modal';
import Contexts from '../../components/admin_components/Context';


type AdminProps = AdminPageDataType; 

const Admin: NextPageCustomized<AdminProps> = ({categories, products, aboutHtmlText} ) => {


  return (
    <Contexts>
      <div className={styles.wrapper}>
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
            subtitles={[]}
            />
        </section>
        <section className={styles.section + ' ' + styles.full}>
          <About
            htmlText={aboutHtmlText}
            />
        </section>
      </div>
      <Modals />
    </Contexts>
  ); 
}

export default Admin;


/****************************
 * Customized page
 */


Admin.pageConfig = pageConfigs.admin;


/****************************
 * getServerSideProps
 */
export const getServerSideProps = async () => {
  const response = await getAdminPageData();


  return {
    props: {
      response 
    }
  }
}