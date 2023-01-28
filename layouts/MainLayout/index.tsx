import React, { FC } from 'react';
import styles from './Layout.module.scss';

import Head from 'next/head';
import NavBar from '../../components/NavBar';
import Logo from '../../components/Logo';
import { PageInfoType } from '../../config';

interface MainLayoutProps {
  children: React.ReactNode;
  pageInfo?: PageInfoType
}

const MainLayout: FC<MainLayoutProps> = ({children, pageInfo}) => (
    <>
      <Head>
        <title>{pageInfo? pageInfo.title + " :: " : ''}Nail Supply Shop</title>
        <link rel="icon" href="/favicon.ico" />
        {pageInfo && <meta name="description" content={pageInfo.description} />}
      </Head>
      <div className={styles.Layout}>
        <header className={styles.header}>
          <Logo />
          <NavBar currentPageSlug={pageInfo? pageInfo.slug : null}/>
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

export default MainLayout;
