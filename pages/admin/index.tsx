import Category from '../../components/admin_components/Category';
import HeroImage from '../../components/admin_components/HeroImage';
import Product from '../../components/admin_components/Product';
import Subtitles from '../../components/admin_components/Subtitles';
import About from '../../components/admin_components/About';

import styles from '../../styles/admin.module.scss';

import { CategoryType, ProductType, SubtitleType, getCategories, getProducts, ResponseType } from '../../database';
import ErrorLayout from '../../layouts/ErrorLayout';
import { NextPageCustomized } from '../_app';
import { pageInfos } from '../../config';


interface AdminProps {
  categoriesResponse: ResponseType<CategoryType[]>;
  productsResponse: ResponseType<ProductType[]>;
  subtitles: SubtitleType[];
  aboutHtmlText: string;  
}

const Admin: NextPageCustomized<AdminProps> = ({categoriesResponse, productsResponse, subtitles, aboutHtmlText}) => {

  // when status === 'error', the handling is done in ErrorLayout
  const [catStatus, categories] = categoriesResponse;
  const [prodStatus, products] = productsResponse;

  

  return (
    <ErrorLayout
        responses={[categoriesResponse, productsResponse]}
      >
        <div className={styles.wrapper}>
          <section className={styles.section}>
            <Category
              categories={categories as CategoryType[]}  
              />
          </section>
          <section className={styles.section}>
            <Product
              categories={categories as CategoryType[]}
              products={products as ProductType[]}
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
    </ErrorLayout>
  ); 
}

export default Admin;


/****************************
 * Customized page
 */
Admin.HeroImage = HeroImage;


Admin.pageInfo = pageInfos.admin;


/****************************
 * getServerSideProps
 */
export const getServerSideProps = async () => {
  const categoriesResponse = await getCategories();
  const productsResponse = await getProducts({limit: 20});





  return {
    props: {
      categoriesResponse,
      productsResponse,
      // TODO: get aboutHtmlText from database
      aboutHtmlText: 'About Text',
      // TODO: get subtitles from database
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