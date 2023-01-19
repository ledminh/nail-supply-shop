import { FunctionComponent, ReactNode } from "react";

import styles from './HeroImageLayout.module.scss';

import Image, { StaticImageData } from "next/image";

import Logo from '../../components/Logo';
import NavBar from '../../components/NavBar';

/***************************
 * Type 
 */
type HeightsType = {
    mobile: string,
    tablet: string,
    desktop: string
}

type ImagesType = {
    mobile: StaticImageData,
    tablet: StaticImageData,
    desktop: StaticImageData
}

interface HeroLayoutProps {
    heights: HeightsType,
    images: ImagesType,
    altText: string,
    children: ReactNode
}

type HeroLayoutComponent = FunctionComponent<HeroLayoutProps>;


/***************************
 * MainComponent 
 */

const HeroImageLayout:HeroLayoutComponent = ({heights,images, altText, children}) => {


    return (
        <>
            <section className={`${styles.wrapper} ${styles.mobile}`}
                style={{
                    height: heights.mobile
                }}
            >
                <Image
                    src={images.mobile}
                    alt={altText}
                    fill
                    style={{
                        objectFit: 'cover'
                    }}
                    sizes="640px"
                    placeholder='blur'
                />
                <div className={styles.content}>
                    <div className={styles.body}>
                        {children}
                    </div>
                </div>
            </section>

            <section className={`${styles.wrapper} ${styles.tablet}`}
                style={{
                    height: heights.tablet
                }}
            >
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

            <section className={`${styles.wrapper} ${styles.desktop}`}
                style={{
                    height: heights.desktop
                }}
            >
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