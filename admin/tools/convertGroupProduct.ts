import { ProductGroupType } from "../../database";
import { _ProductGroupType } from "../types";


// Converting the ProductType to _ProductType
const convertGroupProduct = (productGroup: ProductGroupType): _ProductGroupType => {



    return productGroup.map(product => {
        return {
            ...product,
            new: false,
            newest: false,
            toBeDeleted: false,
            isEditingImages: false
        }   
    });
};

export default convertGroupProduct;