import { FunctionComponent } from "react";

import styles from './ItemLayout.module.scss';

import Image from 'next/image';


import Link from 'next/link';

/***************************
 *  Types
 */
interface ItemLayoutPropsType {
    children: React.ReactNode;
    name: string;
    url: string;
    imageUrl: string;
} 

export type ItemLayoutType = FunctionComponent<ItemLayoutPropsType>



/***************************
 *  Main Component
 */
const ItemLayout:ItemLayoutType = ({children, name, url, imageUrl}) => {

    return (
        <div className={styles.wrapper}>
            <Link href={url}>
                <Image
                    className={styles.image}
                    src={imageUrl}
                    alt={name}
                    fill
                    style={{objectFit: 'cover'}}
                    />
                <div className={styles.body}>
                    {children}
                </div>
            </Link>
        </div>
    )
}

export default ItemLayout;