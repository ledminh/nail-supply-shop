import { FunctionComponent } from "react";

import styles from './PriceFilter.module.scss';

/***************************
 *  Types
 */
interface PriceFilterPropsType {

} 

type PriceFilterType = FunctionComponent<PriceFilterPropsType>



/***************************
 *  Main Component
 */
const PriceFilter:PriceFilterType = () => {

    return (
        <div className={styles.wrapper}>
            PriceFilter component
        </div>
    )
}

export default PriceFilter;