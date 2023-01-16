import { FunctionComponent } from "react";

import styles from './SpecialOffers.module.scss';

/***************************
 *  Types
 */
interface SpecialOffersPropsType {

} 

type SpecialOffersType = FunctionComponent<SpecialOffersPropsType>



/***************************
 *  Main Component
 */
const SpecialOffers:SpecialOffersType = () => {

    return (
        <div className={styles.wrapper}>
            SpecialOffers component
        </div>
    )
}

export default SpecialOffers;