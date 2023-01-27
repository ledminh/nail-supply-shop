import React, { FC } from 'react';
import HeroImage from '../components/aboutUs_components/HeroImage';

import styles from '../styles/aboutUs.module.scss';
import { NextPageWithLayout } from './_app';


interface AboutProps {}

const About: NextPageWithLayout<AboutProps> = () => (
  <div>
    <div className={styles.body}>
      <div className={styles.text}>
        <p>At our Nail Supply Shop, we&apos;ve been providing top-quality nail products and services for over 20 years. We take pride in offering a wide range of products to meet the needs of both professional nail technicians and at-home enthusiasts.</p>
        <p>Our staff is highly trained and knowledgeable about all of the products we carry, and we&apos;re always happy to help you find exactly what you need. We strive to provide excellent customer service, and work hard to ensure that our prices are competitive and fair.</p>
        <p>We offer a wide range of products including:</p>
        <ul>
          <li>Nail polish</li>
          <li>Nail art supplies</li>
          <li>Acrylics, gels, and other sculpting products</li>
          <li>Tools and equipment</li>
        </ul>
      </div>
      <div className={styles.contact}>
        <h4>Contact Us</h4>
        <p><span className={styles.label}>Phone:</span> 555-555-5555</p>
        <p><span className={styles.label}>Email:</span> support@nail.supply.com</p>
      </div>
    </div>
  </div>
);

export default About;


About.getLayout = (page: React.ReactNode) => (
  <div>
    <HeroImage/>
    {page}
  </div>
);