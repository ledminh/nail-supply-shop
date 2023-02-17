import { useState } from 'react';
import { _CategoryType } from './types';
import { CategoryRequestBody} from '../../../types';
import { NewCategoryType } from '../../../database/types';

import axios from 'axios';


const useCategory = (categories:_CategoryType[]) => {

    const [_categories, _setCategories] = useState<_CategoryType[]>(categories);
    
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
                const newCategory = data.category;

                const cats = _categories.map(cat => {
                    if(cat.newest)
                        cat.newest = false;
                    
                    return cat;
                });

                newCategory.new = true;
                newCategory.newest = true;


                _setCategories([newCategory, ...cats]);
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