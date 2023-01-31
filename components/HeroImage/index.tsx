import { FunctionComponent } from "react";

import styles from './HeroImage.module.scss';

import Image, {StaticImageData} from "next/image";


/***************************
 *  Types
 */
interface HeroImagePropsType {
    title: string,
    subtitle: string,
    image: StaticImageData,
    imgAltText: string
} 

export type HeroImageType = FunctionComponent<HeroImagePropsType>



/***************************
 *  Main Component
 */
const HeroImage:HeroImageType = ({title, subtitle, image, imgAltText}) => {

    return (
        <section className={styles.wrapper}>
            <Image
                src={image}
                alt={imgAltText}
                fill
                style={{
                    objectFit: 'cover'
                }}
                placeholder="blur"
                
            />
            <div className={styles.content}>
                <div className={styles.body}>
                    <h1 className={styles.h1}>{title}</h1>
                    <p className={styles.p}>{subtitle}</p>
                </div>
            </div>
        </section>

    )
}

export default HeroImage;