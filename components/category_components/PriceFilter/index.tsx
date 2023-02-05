import { FunctionComponent, useEffect } from "react";

import { useState } from 'react';

import styles from './PriceFilter.module.scss';

import { priceRanges, PriceRangeType } from "../../../config";

import { handlePriceChangeOption } from "../../../utils/category_page/hooks";

/***************************
 *  Types
 */
interface PriceFilterPropsType {
    handlePriceChange: (op:PriceRangeType|null) => void;
} 

type PriceFilterType = FunctionComponent<PriceFilterPropsType>



/***************************
 *  Main Component
 */
const PriceFilter:PriceFilterType = ({handlePriceChange}) => {
    const [value, setValue] = useState<string>('All');


    useEffect(() => {
        if (value === 'All') {
            handlePriceChange(null);    
        } else {
            const range = priceRanges[parseInt(value)];
            handlePriceChange(range);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);


    return (
        <div className={styles.wrapper}>
            <h4 className={styles.title}>PRICE</h4>
            <div className={styles.select}>
                <select name="price" id="price" 
                    value={value} 
                    onChange={(e) => setValue(e.target.value)} 
                    >
                        <option key="All" value="All">All</option>
                        {
                            priceRanges.map((range, index) => (
                                <option key={index} value={index}>
                                    {range.min === 0 ? `Under $${range.max}` : `$${range.min} - $${range.max}`}
                                </option>
                            ))
                        }
                </select>
            </div>
        </div>
    )
}

export default PriceFilter;