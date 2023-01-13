import React, { FC } from 'react';
import styles from './Layout.module.scss';

import Head from 'next/head';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
}

const Layout: FC<LayoutProps> = ({children, pageTitle}) => (
  <div className={styles.Layout}>
    <Head>
      <title>{pageTitle? pageTitle + " :: " : ""}Nail Supply Shop</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <header>
      <nav>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/shop">Shop</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
    <main>
      {children}
    </main>
    <footer>
      <p>&copy; {(new Date()).getFullYear()} Nail Supply Shop</p>
    </footer>
  </div>
);

export default Layout;
