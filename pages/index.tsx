import styles from '../styles/Home.module.scss'

import Section from '../layouts/Section';


import BestSellers from '../components/home_components/BestSellers';
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
                  <ProductItem product={product} />
                )}
                keyExtractor={(product) => product.id}
                data={newArrivalProducts.map(product => ({
                  ...product,
                  url: `/product/${product.id}`
                  }))}
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
                  <ProductItem product={product} />
                )}
                keyExtractor={(product) => product.id}
                data={bestSellerProducts.map(product => ({
                  ...product,
                  url: `/product/${product.id}`
                  }))}
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

