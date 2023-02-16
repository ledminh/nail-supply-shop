import { FunctionComponent, ReactNode } from "react";

import styles from './ItemLayout.module.scss';

import Image from 'next/image';


import Link from 'next/link';

// TODO: refactor this to make it resuable with LastItem in ListLayout, it should be able to wrap the LastItem

/***************************
 *  Types
 */
interface ItemLayoutPropsType {
    children: ReactNode;
    name: string;
    url?: string;
    imageUrl?: string;
    imageClassName?: string;
} 

export type ItemLayoutType = FunctionComponent<ItemLayoutPropsType>



/***************************
 *  Main Component
 */
const ItemLayout:ItemLayoutType = ({children, name, url, imageUrl, imageClassName}) => {



    return (
        <div className={styles.wrapper}>
            <_Link href={url}>
                {
                    imageUrl? (
                        <Image
                            className={`${styles.image}${imageClassName? ' ' + imageClassName: ''}`}
                            src={imageUrl}
                            alt={name}
                            fill
                            style={{objectFit: 'cover'}}
                            />
                    ) : null
                }
                <div className={styles.body}>
                    {children}
                </div>
            </_Link>
        </div>
    )
}

export default ItemLayout;

type _LinkProps = {
    children: ReactNode;
    href?: string;
}

const _Link:FunctionComponent<_LinkProps> = ({children, href}) => (
    href? (
        <Link href={href}>
            {children}
        </Link>
    ) : (
        <>{children}</>
    )
);

