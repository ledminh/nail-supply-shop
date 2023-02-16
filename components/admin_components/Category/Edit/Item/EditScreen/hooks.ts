import { useState } from 'react';
import { _CategoryType } from '../../../types';


type useEditScreenParams = {
    category: _CategoryType;
}

const useEditScreen = ({category}: useEditScreenParams) => {
    const [categoryName, setCategoryName] = useState(category.name);
    const [categoryDescription, setCategoryDescription] = useState(category.description);

    const handleCategoryNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategoryName(e.target.value);
    }

    const handleCategoryDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCategoryDescription(e.target.value);
    }


    return {
        categoryName,
        categoryDescription,
        handleCategoryNameChange,
        handleCategoryDescriptionChange
    }

}

export default useEditScreen;