import { FunctionComponent } from "react";

import styles from './HeroImage.module.scss';

import nailPolishDesktop from '../../../assets/images/desktop/nail-polish.jpg';
import nailPolishMobile from '../../../assets/images/mobile/nail-polish.jpg';
import nailPolishTablet from '../../../assets/images/tablet/nail-polish.jpg';

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
            images={{
            mobile: nailPolishMobile,
            tablet: nailPolishTablet,
            desktop: nailPolishDesktop
            }}
            altText="Nails on a white blanket"  
        >
            <h1 className={styles.h1}>SHOP</h1>
            <p className={styles.p}>Achieve Professional-Level Style with Top-Notch Nail Supplies!</p>
        </HeroImageLayout>
    )
}

export default HeroImage;