import { ProductType, ProductGroupType } from "../../database";
import { _ProductType } from "../types";


// Converting the ProductType to _ProductType
const convertProduct = (product: ProductType): _ProductType => {


    return {
        ...product,
        new: false,
        newest: false,
        toBeDeleted: false,
        isEditingImages: false
    };
};

export default convertProduct;