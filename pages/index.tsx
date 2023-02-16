import styles from '../styles/Home.module.scss'

import Section from '../layouts/Section';

import getMainProduct from '../utils/getMainProduct';

import { NextPageCustomized } from './_app';
import { pageConfigs } from '../config';

import { getHomePageData, HomePageDataType } from '../database';
import ListLayout from '../layouts/ListLayout';
import ProductItem from '../components/home_components/ProductItem';


/***************************
 *  Types
 */


type HomeType = NextPageCustomized<HomePageDataType>;


const Home:HomeType = ({newArrivalProducts, bestSellerProducts}) => {
  

  return (
    <>
      <div className={styles.wrapper}>
        <Section 
            className={styles.newArrivals}
            title="New Arrivals"
            >
            <ListLayout
                wrapperClassName={styles.listWrapper}
                liClassName={styles.li}
                imageClassName={styles.image}
                renderItemBody={(product) => (
                  <ProductItem product={getMainProduct(product)} />
                )}
                keyExtractor={(product) => getMainProduct(product).id}
                getItemName={(product) => getMainProduct(product).name}
                getItemUrl={(product) => `/product/${getMainProduct(product).id}`}
                getItemImageUrl={(product) => {
                  const mainProduct = getMainProduct(product);
                  const defaultImage = mainProduct.images.find(image => image.default);

                  if (!defaultImage) throw new Error('No default image found');

                  return defaultImage.url;
                  
                }}
                data={newArrivalProducts}
              />              
        </Section>    
        <Section 
            className={styles.bestSellers}
            title="BestSellers"
            >
            <ListLayout
                wrapperClassName={styles.listWrapper}
                liClassName={styles.li}
                imageClassName={styles.image}
                renderItemBody={(product) => (
                  <ProductItem product={getMainProduct(product)} />
                )}
                keyExtractor={(product) => getMainProduct(product).id}
                getItemName={(product) => getMainProduct(product).name}
                getItemUrl={(product) => `/product/${getMainProduct(product).id}`}
                getItemImageUrl={(product) => {
                  const mainProduct = getMainProduct(product);
                  const defaultImage = mainProduct.images.find(image => image.default);

                  if (!defaultImage) throw new Error('No default image found');

                  return defaultImage.url;
                  
                }}
                data={bestSellerProducts}
              />              
        </Section>
      </div>
    </>
  )

}


export default Home;



/****************************
 * Customized page
 */
Home.pageConfig = pageConfigs.home;




/****************************
 * getServerSideProps
 */

export const getServerSideProps = async () => {
  const response = await getHomePageData();

  return {
    props: {
      response
      }
  }
}

