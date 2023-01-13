import '../styles/globals.scss'

import type { AppProps } from 'next/app'
import Layout from '../layouts/Layout';
import { NextComponentType, NextPageContext } from 'next';

interface CustomAppProps extends AppProps {
  Component: AppProps['Component'] & {
    title?: string;
  } 

}

export default function App({ Component, pageProps }: CustomAppProps) {

  return (
      <Layout pageTitle={Component.name}>
        <Component {...pageProps} />
      </Layout>
    )
}
