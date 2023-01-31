import { FunctionComponent } from "react";

import styles from './HeroImage.module.scss';

import heroImageDesktop from '../../../assets/images/desktop/hero-image.jpg';
import heroImageMobile from '../../../assets/images/mobile/hero-image.jpg';
import heroImageTablet from '../../../assets/images/tablet/hero-image.jpg';

import HeroImageLayout from '../../../layouts/HeroImageLayout';

/***************************
 *  Types
 */
interface HeroImagePropsType {
    title: string,
    subtitle: string
} 

export type HeroImageType = FunctionComponent<HeroImagePropsType>



/***************************
 *  Main Component
 */
const HeroImage:HeroImageType = ({title, subtitle}) => {

    return (
        <HeroImageLayout
            images={{
            mobile: heroImageMobile,
            tablet: heroImageTablet,
            desktop: heroImageDesktop
            }}
            altText="Nails on a white blanket"  
        >
            <h1 className={styles.h1}>{title}</h1>
            <p className={styles.p}>{subtitle}</p>
        </HeroImageLayout>
    )
}

export default HeroImage;