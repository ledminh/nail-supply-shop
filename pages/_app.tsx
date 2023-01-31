import '../styles/globals.scss'

import {NextPage} from 'next';

import type { AppProps } from 'next/app'
import MainLayout from '../layouts/MainLayout';
import { PageConfigType } from '../config';

import HeroImage from '../components/HeroImage';




export type NextPageCustomized<P={}, IP=P> = NextPage<P, IP> & {
  pageConfig?: PageConfigType
}

type AppPropsCustomized = AppProps & {
  Component: NextPageCustomized
}

export default function App({ Component, pageProps }: AppPropsCustomized) {
  
  const {heroImage} = Component.pageConfig || {heroImage: undefined};

  const {title, description, subtitle} = pageProps.response.pageInfo;

  return (
    <>
      <MainLayout 
        // pass the whole object to MainLayout to traced back the parent page
        pageConfig={Component.pageConfig}
        title={title}
        description={description}
        >
          {
            heroImage &&
              <HeroImage 
                subtitle={subtitle}
                title={title}
                image={heroImage.image}
                imgAltText={heroImage.alt}
              />
          }
        <Component {...pageProps} />
      </MainLayout>
    </>
  )
  
}
