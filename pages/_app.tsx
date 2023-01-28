import '../styles/globals.scss'

import { ReactElement, ReactNode } from 'react';
import {NextPage} from 'next';

import type { AppProps } from 'next/app'
import MainLayout from '../layouts/MainLayout';
import { PageInfoType } from '../config';




export type NextPageCustomized<P={}, IP=P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  pageInfo?: PageInfoType
}

type AppPropsCustomized = AppProps & {
  Component: NextPageCustomized
}

export default function App({ Component, pageProps }: AppPropsCustomized) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <MainLayout pageInfo={Component.pageInfo}>
      {getLayout(<Component {...pageProps} />)}
    </MainLayout>
  )
  
}
