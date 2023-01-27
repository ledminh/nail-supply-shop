import {StaticImageData} from 'next/image';

import styles from '../styles/Home.module.scss'

import HeroImage from '../components/home_components/HeroImage';

import Section from '../layouts/Section';
import NewArrivals from '../components/home_components/NewArrivals';


import Image001JPG from '../assets/images/samples/001.jpg';
import Image002JPG from '../assets/images/samples/002.jpg';
import Image003JPG from '../assets/images/samples/003.jpg';
import Image004JPG from '../assets/images/samples/004.jpg';
import BestSellers from '../components/home_components/BestSellers';
import { NextPageCustomized } from './_app';


/***************************
 *  Types
 */

// TODO: remove this type and use the one from the database
export type ProductSummaryType = {
  id: number,
  name: string,
  description: string,
  image: StaticImageData
}

interface HomePropsType {
  newArrivalProducts: ProductSummaryType[],
  bestSellerProducts: ProductSummaryType[],
}

type HomeType = NextPageCustomized<HomePropsType>;


const Home:HomeType = ({newArrivalProducts, bestSellerProducts}) => {

  return (
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
  )

}


export default Home;



/****************************
 * Customized page
 */
Home.getLayout = (page) => {
  return (
    <>
      <HeroImage/>
      {page}
    </>
  )
}




export const getServerSideProps = async () => {
  return {
    props: {
      newArrivalProducts: [
        {
          "id": 1,
          "name": "Gel polish in shades of red",
          "description": "A collection of red gel polishes to achieve a perfect manicure",
          "image": Image001JPG
        },
        {
          "id": 2,
          "name": "Stamping plates with floral designs",
          "description": "A variety of floral designs to add a touch of elegance to your nails",
          "image": Image002JPG
        },
        {
          "id": 3,
          "name": "Magnetic cat-eye polishes",
          "description": "Magnetic polishes with a cat-eye effect for a unique and mesmerizing look",
          "image": Image003JPG
        },
        {
          "id": 4,
          "name": "Nail art brushes",
          "description": "A set of brushes to help you create intricate nail art designs",
          "image": Image004JPG
        }
      ],

      bestSellerProducts: [
        {
          "id": 1,
          "name": "Classic French manicure kit",
          "description": "A complete kit to achieve the classic French manicure look",
          "href": "/product/1",
          "image": Image001JPG
        },
        {
          "id": 2,
          "name": "Acrylic powder and liquid set",
          "description": "A set of acrylic powder and liquid for sculpting and building nails",
          "href": "/product/2",
          "image": Image002JPG
        },
        {
          "id": 3,
          "name": "Nail art brush set",
          "description": "A set of brushes for creating intricate nail art designs",
          "href": "/product/3",
          "image": Image003JPG
        },
        {
          "id": 4,
          "name": "UV lamp",
          "description": "A UV lamp to cure gel polishes and harden acrylic nails",
          "href": "/product/4",
          "image": Image004JPG
        }
      ]
    }
  }
}

