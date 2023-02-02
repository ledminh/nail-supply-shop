import styles from '../styles/Home.module.scss'

import Section from '../layouts/Section';
import NewArrivals from '../components/home_components/NewArrivals';


import BestSellers from '../components/home_components/BestSellers';
import { NextPageCustomized } from './_app';
import { pageConfigs } from '../config';

import { getHomePageData, HomePageDataType } from '../database';


/***************************
 *  Types
 */


type HomeType = NextPageCustomized<HomePageDataType>;


const Home:HomeType = ({newArrivalProducts, bestSellerProducts}) => {
  

  return (
    <>
      <div className={styles.wrapper}>
        <Section className={styles.newArrivals}>
          <NewArrivals
            products={newArrivalProducts}
          />
        </Section>
    
        <Section className={styles.bestSellers}>
          <BestSellers
            products={bestSellerProducts}
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

