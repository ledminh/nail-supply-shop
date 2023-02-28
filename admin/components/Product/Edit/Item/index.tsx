import { FunctionComponent } from "react";
import { _ProductType, _ProductGroupType } from "../../../../types";


import Product from "../Product";
import ProductGroup from "../ProductGroup";

/***************************
 *  Types
 */
interface ItemPropsType {
    data: _ProductType|_ProductGroupType
} 

type ItemType = FunctionComponent<ItemPropsType>



/***************************
 *  Main Component
 */
const Item:ItemType = ({data}) => {

    
    return Array.isArray(data)? 
                <ProductGroup 
                    productGroup={data}
                    />
                : <Product product={data}/>;    
    
}

export default Item;

