import { FunctionComponent } from "react";

import { useState } from 'react';

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
    const [value, setValue] = useState(0);



    return (
        <div className={styles.wrapper}>
            <h4 className={styles.title}>PRICE</h4>
            <div className={styles.slider}>
                <label>Less than ${value}</label>
                <input className="slider" 
                        id="priceRange"
                        type="range" 
                        min="0" max="50"
                        step={5}
                        onChange = {(e) => setValue(parseInt(e.target.value))}
                        />
            </div>
        </div>
    )
}

export default PriceFilter;