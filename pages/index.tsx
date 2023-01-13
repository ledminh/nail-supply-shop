import { NextPage } from 'next'


import styles from '../styles/Home.module.scss'

const Home:NextPage = () => {
  

  return (
    <div>
      <section className={styles.welcome}>
        <h1>Welcome to Nail Supply Shop</h1>
        <p>We offer a wide selection of nail products, including polishes, tools, and accessories.</p>
      </section>
  
      <section className={styles.newArrivals}>
        <h2>New Arrivals</h2>
        <ul>
          <li>Gel polish in shades of red</li>
          <li>Stamping plates with floral designs</li>
          <li>Magnetic cat-eye polishes</li>
        </ul>
      </section>
  
      <section className={styles.bestSellers}>
        <h2>Best Sellers</h2>
        <ul>
          <li>Classic French manicure kit</li>
          <li>Acrylic powder and liquid set</li>
          <li>Nail art brush set</li>
        </ul>
      </section>
  
      <section className={styles.specialOffers}>
        <h2>Special Offers</h2>
        <ul>
          <li>Buy one, get one 50% off on select polishes</li>
          <li>10% off your first purchase</li>
          <li>Free shipping on orders over $50</li>
        </ul>
      </section>
  
    </div>
  )

}


export default Home;

