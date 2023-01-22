import { FunctionComponent } from "react";
import { ProductType } from "../../../../database";

import Item from "./Item";

import styles from './Edit.module.scss';



/***************************
 *  Types
 */
interface EditPropsType {
    products: ProductType[]
} 

type EditType = FunctionComponent<EditPropsType>



/***************************
 *  Main Component
 */
const Edit:EditType = ({products}) => {

    


    return (
        <div className={styles.wrapper}>
            <h4>Edit</h4>
            <div className={styles.categories}>
                {
                    products.map((product, index) => (
                        <Item 
                            key={index}
                            product={product}
                            />
                    ))
                }
            </div>
        </div>
    )
}

export default Edit;