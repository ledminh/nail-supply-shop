import { FunctionComponent } from "react";

import styles from './BestSellers.module.scss';

import { ProductType } from '../../../database';

import Image from 'next/image';
import Link from 'next/link';

/***************************
 *  Types
 */
interface BestSellersPropsType {
    products: ProductType[]
} 

type BestSellersType = FunctionComponent<BestSellersPropsType>



/***************************
 *  Main Component
 */
const BestSellers:BestSellersType = ({products}) => {

    return (
        <div className={styles.wrapper}>
            <h3 className={styles.h3}>BestSellers</h3>
            <ul className={styles.ul}>
                {
                    products &&
                    products.map(product => (
                        <li key={product.id}>
                            <Link href={`/product/${product.id}`}>
                                <Image 
                                    className={styles.image}
                                    src={product.imageUrl} 
                                    alt={product.name}
                                    fill
                                    sizes="100%"
                                    style={{objectFit: 'cover'}}
                                    />
                                <div className={styles.text}>
                                    <h4 className={styles.name}>{product.name}</h4>
                                    <span>{product.shortDescription}</span>
                                </div>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default BestSellers;