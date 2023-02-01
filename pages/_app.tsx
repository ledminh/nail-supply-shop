import '../styles/globals.scss'

import {NextPage} from 'next';

import type { AppProps } from 'next/app'
import MainLayout from '../layouts/MainLayout';
import { PageConfigType } from '../config';

import HeroImage from '../components/HeroImage';
import ErrorLayout from '../layouts/ErrorLayout';
import { ResponseType } from '../database';
import { AboutPageDataType, CategoryPageDataType, HomePageDataType, ShopPageDataType, AdminPageDataType } from '../database/types';




export type NextPageCustomized<P={}, IP=P> = NextPage<P, IP> & {
  pageConfig?: PageConfigType
}

type AppPropsCustomized = AppProps & {
  Component: NextPageCustomized
}

export default function App({ Component, pageProps }: AppPropsCustomized) {
  
  const pageConfig = Component.pageConfig; 

  const response:ResponseType<HomePageDataType|AboutPageDataType|ShopPageDataType|AdminPageDataType|CategoryPageDataType> = pageProps.response;

  
  return (
    <>
      {/* 1. Check for error first */}
      <ErrorLayout responses={[pageProps.response]}>
          {
            // 2. If it reaches here, no error found. Response[0] === 'success' is just for typescript doesn't complain
            response[0] === 'success' &&
            (
              // 3. populate the layout with pageInfo and pageConfig
              <MainLayout 
                // pass the whole config object to MainLayout to traced back the parent page
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
                  {/* 4. pageInfo has no use here, but still being passed along with other page data */}
                <Component {...pageProps.response[1]} />
              </MainLayout>
            )
          }
      </ErrorLayout>
    </>
  )
  
}