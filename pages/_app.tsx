import '../styles/globals.scss'

import { ReactElement, ReactNode } from 'react';
import {NextPage} from 'next';

import type { AppProps } from 'next/app'
import MainLayout from '../layouts/MainLayout';

export type NextPageCustomized<P={}, IP=P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsCustomized = AppProps & {
  Component: NextPageCustomized
}

export default function App({ Component, pageProps }: AppPropsCustomized) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <MainLayout pageTitle={Component.name}>
      {getLayout(<Component {...pageProps} />)}
    </MainLayout>
  )
  
}
