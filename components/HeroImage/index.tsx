import { FunctionComponent } from "react";

import styles from './HeroImage.module.scss';

import Image, {StaticImageData} from "next/image";


/***************************
 *  Types
 */
interface HeroImagePropsType {
    title: string,
    subtitle?: string,
    image: StaticImageData | string,
    imgAltText: string,
    havePlaceholder: boolean
} 

export type HeroImageType = FunctionComponent<HeroImagePropsType>



/***************************
 *  Main Component
 */
const HeroImage:HeroImageType = ({title, subtitle, image, imgAltText, havePlaceholder}) => {

    return (
        <section className={styles.wrapper}>
            <Image
                src={image}
                alt={imgAltText}
                fill
                style={{
                    objectFit: 'cover'
                }}
                placeholder={havePlaceholder? "blur" : undefined}
                
            />
            <div className={styles.content}>
                <div className={styles.body}>
                    <h1 className={styles.h1}>{title}</h1>
                    {
                        subtitle && <p className={styles.p}>{subtitle}</p>
                    }
                </div>
            </div>
        </section>

    )
}

export default HeroImage;