import { NextPage } from 'next'



import styles from '../styles/Home.module.scss'

import HeroImage from '../components/home_components/HeroImage';

const Home:NextPage = () => {

  return (
    <>
      <HeroImage/>
  
      <section className={styles.newArrivals}>
        <h3>New Arrivals</h3>
        <ul>
          <li>Gel polish in shades of red</li>
          <li>Stamping plates with floral designs</li>
          <li>Magnetic cat-eye polishes</li>
        </ul>
      </section>
  
      <section className={styles.bestSellers}>
        <h3>Best Sellers</h3>
        <ul>
          <li>Classic French manicure kit</li>
          <li>Acrylic powder and liquid set</li>
          <li>Nail art brush set</li>
        </ul>
      </section>
  
      <section className={styles.specialOffers}>
        <h3>Special Offers</h3>
        <ul>
          <li>Buy one, get one 50% off on select polishes</li>
          <li>10% off your first purchase</li>
          <li>Free shipping on orders over $50</li>
        </ul>
      </section>
  
    </>
  )

}


export default Home;

