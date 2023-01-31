import React, { FC } from 'react';
import styles from './Layout.module.scss';

import NavBar from '../../components/NavBar';
import Logo from '../../components/Logo';
import { PageConfigType } from '../../config';
import PageHead from '../../components/PageHead';

interface MainLayoutProps {
  children: React.ReactNode;
  pageConfig?: PageConfigType; 
  title: string;
  description: string;
}

const MainLayout: FC<MainLayoutProps> = ({children, pageConfig, title, description}) => {

  // Get the current page's slug to highlight the correct nav link
  // (if the current page is a child page, get the parent page's slug) since
  // the nav links are for the parent pages
  const currentSlug = getCurrentSlug(pageConfig);


  return (
    <>
      <PageHead 
        title={title}
        description={description}
        />
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
const getCurrentSlug = (pageConfig?: PageConfigType) => {
  if(!pageConfig) return null;


  while(pageConfig.getParent) {
    pageConfig = pageConfig.getParent();
  }

  return pageConfig.slug;
}