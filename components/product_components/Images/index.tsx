import { FunctionComponent, useState } from "react";

import styles from './Images.module.scss';

import Image from 'next/image';
import { ProductImageType } from "../../../database";

/***************************
 *  Types
 */
interface ImagesPropsType {
    images: ProductImageType[];
    productName: string;
} 

type ImagesType = FunctionComponent<ImagesPropsType>



/***************************
 *  Main Component
 */
const Images:ImagesType = ({images, productName}) => {

    const [selectedIndex, setSelectedIndex] = useState(images.findIndex(image => image.default));

    return (
        <div className={styles.wrapper}>
            {
                images.map((image, index) => {
                    return (
                        <div key={index} 
                        className={`${styles.image}${index === selectedIndex? ' ' + styles.selected: ''}`}
                        onClick={() => setSelectedIndex(index)}
                        >
                            <Image 
                                src={image.url}
                                alt= {image.alt? image.alt : `${productName} image ${index + 1}`}
                                fill
                                style={{objectFit: 'cover'}}
                            />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Images;