import React, { FC } from 'react';
import styles from './Layout.module.scss';

import Head from 'next/head';
import NavBar from '../../components/NavBar';
import Logo from '../../components/Logo';

interface MainLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
}

const MainLayout: FC<MainLayoutProps> = ({children, pageTitle}) => (
    <>
      <Head>
        <title>{pageTitle? pageTitle + " :: " : ""}Nail Supply Shop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.Layout}>
        <header className={styles.header}>
          <Logo />
          <NavBar currentPage={pageTitle}/>
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
