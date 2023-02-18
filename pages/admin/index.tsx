// config
import { NextPageCustomized } from '../_app';
import { pageConfigs } from '../../config';


// components
import { About, Category, Product, Subtitles } from '../../admin/components';

import Modals from '../../admin/Modal';
import Context from '../../admin/Context';

// styles
import styles from '../../styles/admin.module.scss';



// server
import {getAdminPageData, AdminPageDataType } from '../../database';



/***********************************************************/
// Types
/***********************************************************/

type AdminProps = AdminPageDataType; 



/***********************************************************/
// Page
/***********************************************************/

const Admin: NextPageCustomized<AdminProps> = ({categories, products, aboutHtmlText} ) => {


  return (
    <Context categories={categories} products={products} aboutHtmlText={aboutHtmlText}>
      <div className={styles.wrapper}>
        <section className={styles.section}>
          <Category />
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
    </Context>
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