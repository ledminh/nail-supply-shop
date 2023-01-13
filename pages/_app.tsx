import '../styles/globals.scss'

import type { AppProps } from 'next/app'
import MainLayout from '../layouts/MainLayout';
import { NextComponentType, NextPageContext } from 'next';

interface CustomAppProps extends AppProps {
  Component: AppProps['Component'] & {
    title?: string;
  } 

}

export default function App({ Component, pageProps }: CustomAppProps) {

  return (
      <MainLayout pageTitle={Component.name}>
        <Component {...pageProps} />
      </MainLayout>
    )
}
