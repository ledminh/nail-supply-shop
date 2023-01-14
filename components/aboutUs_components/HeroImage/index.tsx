import { FunctionComponent } from "react";

import styles from './HeroImage.module.scss';

import beauticianImageDesktop from '../../../assets/images/desktop/beautician.jpg';
import beauticianImageMobile from '../../../assets/images/mobile/beautician.jpg';
import beauticianImageTablet from '../../../assets/images/tablet/beautician.jpg';

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
            mobile: beauticianImageMobile,
            tablet: beauticianImageTablet,
            desktop: beauticianImageDesktop
            }}
            altText="Nails on a white blanket"  
        >
            <div className={styles.HeroImage}>
                <h1 className={styles.h1}>About Us</h1>
                <p className={styles.p}>Our team, our misson, and our values.</p>
            </div>
        </HeroImageLayout>
    )
}

export default HeroImage;