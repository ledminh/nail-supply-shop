import '../styles/globals.scss'

import { FunctionComponent, ReactElement, ReactNode } from 'react';
import {NextPage} from 'next';

import type { AppProps } from 'next/app'
import MainLayout from '../layouts/MainLayout';
import { PageInfoType } from '../config';




export type NextPageCustomized<P={}, IP=P> = NextPage<P, IP> & {
  HeroImage?: FunctionComponent;
  pageInfo?: PageInfoType
}

type AppPropsCustomized = AppProps & {
  Component: NextPageCustomized
}

export default function App({ Component, pageProps }: AppPropsCustomized) {
  
  const HeroImage = Component.HeroImage ?? (() => null);

  return (
    <MainLayout pageInfo={Component.pageInfo}>
      <HeroImage />
      <Component {...pageProps} />
    </MainLayout>
  )
  
}
