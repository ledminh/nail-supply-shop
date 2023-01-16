import { FunctionComponent } from "react";

import styles from './NewArrivals.module.scss';


import Image from 'next/image';
import Link from 'next/link';
import { ProductSummaryType } from "../../../pages";

/***************************
 *  Types
 */




interface NewArrivalsPropsType {
    products: ProductSummaryType[]
} 

type NewArrivalsType = FunctionComponent<NewArrivalsPropsType>



/***************************
 *  Main Component
 */
const NewArrivals:NewArrivalsType = ({products}) => {
    
    return (
        <div className={styles.wrapper}>
            <h3 className={styles.h3}>New Arrivals</h3>
            <ul className={styles.ul}>
                {
                    products &&
                    products.map(product => (
                        <li key={product.id}>
                            <Link href={`/product/${product.id}`}>
                                <Image 
                                    className={styles.image}
                                    src={product.image} 
                                    alt={product.name}
                                    fill
                                    style={{objectFit: 'cover'}}
                                    />
                                <div className={styles.text}>
                                    <h4 className={styles.name}>{product.name}</h4>
                                    <span>{product.description}</span>
                                </div>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default NewArrivals;