import { FunctionComponent } from "react";

import styles from './ItemBody.module.scss';

import { ProductType } from '../../../../database';


/***************************
 *  Types
 */
interface ItemBodyPropsType {
    product: ProductType;
} 

type ItemBodyType = FunctionComponent<ItemBodyPropsType>



/***************************
 *  Main Component
 */
const ItemBody:ItemBodyType = ({product}) => {

    return (
        <>
            <h4>{product.name}</h4>
            <p>{product.shortDescription}</p>
            <div className={styles.price}>
                <span>Price: </span>
                <span>${product.price}</span>
            </div>
        </>
    )
}

export default ItemBody;