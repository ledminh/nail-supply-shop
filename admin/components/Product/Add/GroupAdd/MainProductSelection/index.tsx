import { FunctionComponent } from "react";
import { ProductGroupToAdd } from "../index";


/***************************
 *  Types
 */
type MainProductSelectionPropsType = {
    stylesField: string;
    productGroup: ProductGroupToAdd;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    mainProductID: string;
}

type MainProductSelectionType = FunctionComponent<MainProductSelectionPropsType>


/***************************
 * Main Component
 */ 

const MainProductSelection:MainProductSelectionType = ({
    stylesField,
    productGroup,
    onChange,
    mainProductID
}) => {

    return (
        <div className={stylesField}>
            <label htmlFor="main-product">Main Product</label>
            <select 
                name="main-product"
                id="main-product"
                onChange={onChange}
                value={mainProductID}
                disabled={productGroup.length === 0}
                >
                {
                    productGroup.map((product) => (
                        <option 
                            key={product._id} 
                            value={product._id}
                            >
                                {product.variantName}
                        </option>
                    ))
                }
            </select>
        </div>
    )
}

export default MainProductSelection;