import {StaticImageData} from 'next/image';

import styles from '../styles/Home.module.scss'

import HeroImage from '../components/HeroImage';

import Section from '../layouts/Section';
import NewArrivals from '../components/home_components/NewArrivals';


import Image001JPG from '../assets/images/samples/001.jpg';
import Image002JPG from '../assets/images/samples/002.jpg';
import Image003JPG from '../assets/images/samples/003.jpg';
import Image004JPG from '../assets/images/samples/004.jpg';
import BestSellers from '../components/home_components/BestSellers';
import { NextPageCustomized } from './_app';
import { pageConfigs } from '../config';

import { getHomePageData, ProductType, HomePageDataType } from '../database';


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

  // TODO: create new API endpoint to fetch data from database: newArrivalProducts, bestSellerProducts
  return {
    props: {
      response
      }
  }
}

