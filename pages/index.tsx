import { NextPage } from 'next'

import {StaticImageData} from 'next/image';

import styles from '../styles/Home.module.scss'

import HeroImage from '../components/home_components/HeroImage';

import Section from '../layouts/Section';
import NewArrivals from '../components/home_components/NewArrivals';


import Image001JPG from '../assets/images/samples/001.jpg';
import Image002JPG from '../assets/images/samples/002.jpg';
import Image003JPG from '../assets/images/samples/003.jpg';
import Image004JPG from '../assets/images/samples/004.jpg';


/***************************
 *  Types
 */

export type ProductSummaryType = {
  id: number,
  name: string,
  description: string,
  image: StaticImageData
}

interface HomePropsType {
  newArrivalProducts: ProductSummaryType[]
}

type HomeType = NextPage<HomePropsType>;


const Home:HomeType = ({newArrivalProducts}) => {

  return (
    <>
      <HeroImage/>
  
      <Section className={styles.newArrivals}>
        <NewArrivals
          products={newArrivalProducts}
        />
      </Section>
  
      <Section className={styles.bestSellers}>
        <h3>Best Sellers</h3>
        <ul>
          <li>Classic French manicure kit</li>
          <li>Acrylic powder and liquid set</li>
          <li>Nail art brush set</li>
        </ul>
      </Section>
  
      <Section className={styles.specialOffers}>
        <h3>Special Offers</h3>
        <ul>
          <li>Buy one, get one 50% off on select polishes</li>
          <li>10% off your first purchase</li>
          <li>Free shipping on orders over $50</li>
        </ul>
      </Section>
  
    </>
  )

}


export default Home;

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
      ]
    }
  }
}

