import '../styles/globals.scss'

import {NextPage} from 'next';

import type { AppProps } from 'next/app'
import MainLayout from '../layouts/MainLayout';
import { PageConfigType } from '../config';

import HeroImage from '../components/HeroImage';
import ErrorLayout from '../layouts/ErrorLayout';

import { errorHeroImage } from '../config';
import { useEffect, useState } from 'react';





export type NextPageCustomized<P={}, IP=P> = NextPage<P, IP> & {
  pageConfig?: PageConfigType
}


type AppPropsCustomized = AppProps & {
  Component: NextPageCustomized
}

export default function App({ Component, pageProps }: AppPropsCustomized) {
  


  
  
  if(pageProps.statusCode) {

    return (
      <MainLayout 
        title={'Error'}
        description={'Sorry, there is something wrong.'}
        >
          <HeroImage 
            title='Error'
            image={
              errorHeroImage.image
            }
            
            imgAltText={
              errorHeroImage.alt
            }
            havePlaceholder={true}
          />
          <ErrorLayout 
            statusCode={pageProps.statusCode}
            />          
      </MainLayout>
    );
  } 
  
  if(pageProps.response[0] === 'error') {

    return (
      <MainLayout
        title={'Error'}
        description={'Sorry, there is something wrong.'}
      >
        <HeroImage 
            title='Error'
            image={
              errorHeroImage.image
            }
            
            imgAltText={
              errorHeroImage.alt
            }
            havePlaceholder={true}
          />
        <ErrorLayout
          errorMessage={pageProps.response[1]}
        />
      </MainLayout>
    )
  }
    
  const pageConfig = Component.pageConfig; 
  const response = pageProps.response; 
        
  return (
    <MainLayout 
      pageConfig={pageConfig}
      title={response[1].pageInfo.title}
      description={response[1].pageInfo.description}
      >
        {
          response[1].pageInfo.heroImage ?
            <HeroImage 
              subtitle={response[1].pageInfo.subtitle}
              title={response[1].pageInfo.title}
              
              image={
                response[1].pageInfo.heroImage.image
              }
              
              imgAltText={
                response[1].pageInfo.heroImage.alt
              }
              havePlaceholder={false}
              />: pageConfig?.heroImage?
              <HeroImage 
                subtitle={response[1].pageInfo.subtitle}
                title={response[1].pageInfo.title}
                
                image={
                  pageConfig.heroImage.image
                }
                
                imgAltText={
                  pageConfig.heroImage.alt
                }
                havePlaceholder={true}
              />: null                       
        }
      <Component {...pageProps.response[1]} />
    </MainLayout>
  );

}