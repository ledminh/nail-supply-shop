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
            <div className={styles.select}>
                <select name="price" id="price" value={value} onChange={(e) => setValue(parseInt(e.target.value))}>
                    <option value="0">All</option>
                    <option value="1">Under $2</option>
                    <option value="2">$2 - $5</option>
                    <option value="3">$5 - $10</option>
                    <option value="4">$10 - $20</option>
                    <option value="5">$20 - $30</option>
                    <option value="6">$30 - $40</option>
                    <option value="7">$40 - $50</option>
                </select>
            </div>
        </div>
    )
}

export default PriceFilter;