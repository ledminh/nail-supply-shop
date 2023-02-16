import { useState } from 'react';
import { _CategoryType } from '../../../types';
import { useContext } from 'react';

import ModalContext from '../../../../Context/AdminContext';

type useEditScreenParams = {
    category: _CategoryType;
}

const useEditScreen = ({category}: useEditScreenParams) => {
    // from Contexts
    const {setCatImageShow} = useContext(ModalContext);
    
    
    
    // private state
    const [categoryName, setCategoryName] = useState(category.name);
    const [categoryDescription, setCategoryDescription] = useState(category.description);



    /******************************
     *  Public functions          *
     */
    const handleCategoryNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategoryName(e.target.value);
    }

    const handleCategoryDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCategoryDescription(e.target.value);
    }

    const handleImageClick = () => {
        setCatImageShow(true);
    }

    return {
        categoryName,
        categoryDescription,
        handleCategoryNameChange,
        handleCategoryDescriptionChange,
        handleImageClick
    }

}

export default useEditScreen;