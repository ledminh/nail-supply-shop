import React from 'react';

import styles from '../styles/aboutUs.module.scss';
import { NextPageCustomized } from './_app';

import { pageConfigs } from '../config';

import { getAboutPageData } from '../database';
import { AboutPageDataType } from '../database/types';




type AboutPageType = NextPageCustomized<AboutPageDataType>;

const About: AboutPageType = ({aboutHtmlText}) => {
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.text} 
        dangerouslySetInnerHTML={{__html: aboutHtmlText}}
      /> 
      
      <div className={styles.contact}>
        <h4>Contact Us</h4>
        <p><span className={styles.label}>Phone:</span> 555-555-5555</p>
        <p><span className={styles.label}>Email:</span> support@nail.supply.com</p>
      </div>
    </div>
  );
}


export default About;

/****************************
 * Customized page
 */
About.pageConfig = pageConfigs.about;

export const getServerSideProps = async () => {

  const response = await getAboutPageData();

  return {
    props: {
      response
    }
  }
} 

