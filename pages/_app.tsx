import '../styles/globals.scss'

import { FunctionComponent, ReactElement, ReactNode } from 'react';
import {NextPage} from 'next';

import type { AppProps } from 'next/app'
import MainLayout from '../layouts/MainLayout';
import { PageConfigType } from '../config';
import { HeroImageType } from '../components/home_components/HeroImage';




export type NextPageCustomized<P={}, IP=P> = NextPage<P, IP> & {
  HeroImage?: HeroImageType
  pageConfig?: PageConfigType
}

type AppPropsCustomized = AppProps & {
  Component: NextPageCustomized
}

export default function App({ Component, pageProps }: AppPropsCustomized) {
  
  const HeroImage = Component.HeroImage ?? (() => null);
  const {info} = pageProps.response;

  return (
    <>
      <MainLayout 
        pageConfig={Component.pageConfig}
        title={info.title}
        description={info.description}
        >
        <HeroImage 
          subtitle={info.subtitle}
          title={info.title}
        />
        <Component {...pageProps} />
      </MainLayout>
    </>
  )
  
}
