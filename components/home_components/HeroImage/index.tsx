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

} 

type HeroImageType = FunctionComponent<HeroImagePropsType>



/***************************
 *  Main Component
 */
const HeroImage:HeroImageType = () => {

    return (
        <HeroImageLayout
            heights={{
            mobile: '300px',
            tablet: '400px',
            desktop: '500px'
            }}
            images={{
            mobile: heroImageMobile,
            tablet: heroImageTablet,
            desktop: heroImageDesktop
            }}
            altText="Nails on a white blanket"  
        >
            <h2 className={styles.h2}>Welcome to</h2>
            <h1 className={styles.h1}> Nail Supply Shop</h1>
            <p className={styles.p}>We offer a wide selection of nail products, including polishes, tools, and accessories.</p>
        </HeroImageLayout>
    )
}

export default HeroImage;