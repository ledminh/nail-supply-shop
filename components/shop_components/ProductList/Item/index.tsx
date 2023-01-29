import { FunctionComponent } from "react";

import styles from './Item.module.scss';

import Image from 'next/image';

import { ProductType } from '../../../../database';

import Link from 'next/link';

/***************************
 *  Types
 */
interface ItemPropsType {
    product: ProductType;
} 

type ItemType = FunctionComponent<ItemPropsType>



/***************************
 *  Main Component
 */
const Item:ItemType = ({product}) => {

    return (
        <div className={styles.wrapper}>
            <Link href={`/product/${product.id}`}>
                <Image
                    className={styles.image}
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    style={{objectFit: 'cover'}}
                    />
                <div className={styles.body}>
                    <h4>{product.name}</h4>
                    <p>{product.shortDescription}</p>
                    <div className={styles.price}>
                        <span>Price: </span>
                        <span>${product.price}</span>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Item;