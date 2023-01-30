import React, { FC } from 'react';
import styles from './Layout.module.scss';

import Head from 'next/head';
import NavBar from '../../components/NavBar';
import Logo from '../../components/Logo';
import { PageInfoType, SlugType } from '../../config';

interface MainLayoutProps {
  children: React.ReactNode;
  pageInfo?: PageInfoType;
}

const MainLayout: FC<MainLayoutProps> = ({children, pageInfo}) => {

  // Get the current page's slug to highlight the correct nav link
  // (if the current page is a child page, get the parent page's slug) since
  // the nav links are for the parent pages
  const currentSlug = getCurrentSlug(pageInfo);


  return (
    <>
      <Head>
        <title>{pageInfo? pageInfo.title + " :: " : ''}Nail Supply Shop</title>
        <link rel="icon" href="/favicon.ico" />
        {pageInfo && <meta name="description" content={pageInfo.description} />}
      </Head>
      <div className={styles.Layout}>
        <header className={styles.header}>
          <Logo />
          <NavBar currentPageSlug={currentSlug}/>
        </header>
        <main className={styles.main}>
          {children}
        </main>
        <footer className={styles.footer}>
          <p>&copy; {(new Date()).getFullYear()} Nail Supply Shop</p>
        </footer>
      </div>
    </>
  );
}



export default MainLayout;




/**********************
 * Helper Functions
 */
const getCurrentSlug = (pageInfo?: PageInfoType) => {
  if(!pageInfo) return null;


  while(pageInfo.getParent) {
    pageInfo = pageInfo.getParent();
  }

  return pageInfo.slug;
}