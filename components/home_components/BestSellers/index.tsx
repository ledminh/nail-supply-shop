import { FunctionComponent } from "react";

import styles from './BestSellers.module.scss';

/***************************
 *  Types
 */
interface BestSellersPropsType {

} 

type BestSellersType = FunctionComponent<BestSellersPropsType>



/***************************
 *  Main Component
 */
const BestSellers:BestSellersType = () => {

    return (
        <div className={styles.wrapper}>
            BestSellers component
        </div>
    )
}

export default BestSellers;