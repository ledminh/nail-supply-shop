import { FunctionComponent } from "react";


import { ProductType } from '../../../database';

import ListLayout from "../../../layouts/ListLayout";
import ItemBody from "./ItemBody";



/***************************
 *  Types
 */
interface ProductListPropsType {
    products: ProductType[];
} 

type ProductListType = FunctionComponent<ProductListPropsType>



/***************************
 *  Main Component
 */
const ProductList:ProductListType = ({products}) => {

    return (
        <ListLayout
            renderItemBody={(product) => <ItemBody product={product}/>}
            keyExtractor={(product) => product.id}
            data={products.map((product) => ({
                ...product,
                url: `/product/${product.id}`,
                }))}
            />
        
    )
}

export default ProductList;