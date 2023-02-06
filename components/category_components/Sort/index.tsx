import { FunctionComponent, useState, useEffect } from "react";
import { defaultSortConfig } from "../../../config";
import { SortConfigType, SortOrderType, SortType } from "../../../database/types";
import { handleSortChangeParam } from "../../../utils/category_page/hooks";


import styles from './Sort.module.scss';

/***************************
 *  Types
 */



interface SortPropsType {
    handleSortChange: (sortConfig: handleSortChangeParam) => void;
    currentSort: SortConfigType | null;
} 

type SortComponentType = FunctionComponent<SortPropsType>



/***************************
 *  Main Component
 */
const Sort:SortComponentType = ({handleSortChange, currentSort}) => {
    const [type, setType] = useState<SortType>(currentSort? currentSort.type: defaultSortConfig.type);
    const [order, setOrder] = useState<SortOrderType>(currentSort? currentSort.order: defaultSortConfig.order);


    useEffect(() => {
        handleSortChange({type, order});
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type, order]);


    return (
        <div className={styles.wrapper}>
            <h4 className={styles.title}>SORT</h4>
            <div className={styles.sortCriteria}>
                <select name="sort" 
                    id="sort"
                    onChange={(e) => 
                        setType(e.target.value as SortType)
                    }
                    value={type}
                    >
                    <option value="price">Price</option>
                    <option value="name">Name</option>
                </select>
                <select name="order" 
                    id="order"
                    onChange={(e) => 
                        setOrder(e.target.value as SortOrderType)}
                    >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
        </div>
    )
}

export default Sort;