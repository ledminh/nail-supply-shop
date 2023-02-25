import { FunctionComponent } from "react";
import { ProductGroupType } from "../../../../../database";
import { _ProductType } from "../../../../types";

import styles from './Item.module.scss';

import Product from "../Product";
import ProductGroup from "../ProductGroup";

/***************************
 *  Types
 */
interface ItemPropsType {
    data: _ProductType|ProductGroupType
} 

type ItemType = FunctionComponent<ItemPropsType>



/***************************
 *  Main Component
 */
const Item:ItemType = ({data}) => {

    
    return Array.isArray(data)? 
                <ProductGroup />
                : <Product />;    
    
}

export default Item;

