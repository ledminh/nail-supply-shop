import { CategoryType } from "../../database";
import { _CategoryType } from "../types";


// This is the function that converts the CategoryType to _CategoryType
const convertCategory = (category: CategoryType): _CategoryType => {
    return {
        ...category,
        new: false,
        newest: false,
        toBeDeleted: false,
        isEditingImage: false
    };
};

export default convertCategory;