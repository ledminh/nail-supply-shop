import { FunctionComponent } from "react";
import { _CategoryType } from "../../../../types";

import styles from './CategoryList.module.scss';

import useCategoryList from "./useCategoryList";

/***************************
 *  Types
 */
interface CategoryListPropsType {
    stylesField: string;
    onCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    selectedCategoryID: string;
    categories: _CategoryType[]
} 

type CategoryListType = FunctionComponent<CategoryListPropsType>



/***************************
 *  Main Component
 */
const CategoryList:CategoryListType = ({
    stylesField,
    onCategoryChange,
    selectedCategoryID,
    categories
}) => {

    const {} = useCategoryList({});

    return (
        <div className={stylesField}>
            <label htmlFor="category">Category</label>
            <select name="category" id="category"
                onChange={onCategoryChange}
                value={selectedCategoryID}
                >
                {categories.map((category) => (
                    <option 
                        key={category.id} 
                        value={category.id}
                        >
                            {category.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default CategoryList;