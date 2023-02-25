import { FunctionComponent } from "react";

import styles from './ProductGroup.module.scss';

import useProductGroup from "./useProductGroup";

/***************************
 *  Types
 */
interface ProductGroupPropsType {

} 

type ProductGroupType = FunctionComponent<ProductGroupPropsType>



/***************************
 *  Main Component
 */
const ProductGroup:ProductGroupType = () => {

    const {} = useProductGroup({});

    return (
        <div className={styles.wrapper}>
            ProductGroup component
        </div>
    )
}

export default ProductGroup;