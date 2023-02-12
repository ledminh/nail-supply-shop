import { useState } from 'react';
import { CategoryType } from '../../../database';
import { CategoryRequestBody} from '../../../types';
import { NewCategoryType } from '../../../database/types';

import axios from 'axios';


const useCategory = (categories:CategoryType[]) => {

    const [_categories, _setCategories] = useState<CategoryType[]>(categories);
    
    const handleAdd = (newCat: NewCategoryType) => {

        const reqBody:CategoryRequestBody = {
            type: 'add',
            data: newCat
        } 

        axios.post('/api/category', reqBody,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(({data}) => {
            const { success } = data;

            if(success) {
                const { newCategory } = data;
                _setCategories([newCategory, ...categories]);
            }
            else {
                const { message } = data;
                throw new Error(message);
            }

            
        });
    }


    return {
        handleAdd,
        _categories
    }

}



export default useCategory;