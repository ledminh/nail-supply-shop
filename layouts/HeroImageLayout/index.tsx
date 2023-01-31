import { FunctionComponent, ReactNode } from "react";

import styles from './HeroImageLayout.module.scss';

import Image, { StaticImageData } from "next/image";


/***************************
 * Type 
 */


type ImagesType = {
    mobile: StaticImageData,
    tablet: StaticImageData,
    desktop: StaticImageData
}

interface HeroLayoutProps {
    images: ImagesType,
    altText: string,
    children: ReactNode
}

type HeroLayoutComponent = FunctionComponent<HeroLayoutProps>;


/***************************
 * MainComponent 
 */

const HeroImageLayout:HeroLayoutComponent = ({images, altText, children}) => {


    return (
        <>
            <section className={`${styles.wrapper} ${styles.tablet}`}>
                <Image
                    src={images.tablet}
                    alt={altText}
                    fill
                    style={{
                        objectFit: 'cover'
                    }}
                    sizes="1280px"
                    placeholder='blur'
                />
                <div className={styles.content}>
                    <div className={styles.body}>
                        {children}
                    </div>
                </div>
            </section>

            <section className={`${styles.wrapper} ${styles.desktop}`}>
                <Image
                    src={images.desktop}
                    alt={altText}
                    fill
                    style={{
                        objectFit: 'cover'
                    }}
                    sizes="1920px"
                    placeholder='blur'
                />
                <div className={styles.content}>
                    <div className={styles.body}>
                        {children}
                    </div>
                </div>
            </section>
        </>
        
    )
} 


export default HeroImageLayout;