import { useState } from 'react';
import { _CategoryType } from './types';
import { CategoryToAdd } from '../../types';

import postCategory from '../../tools/postCategory';



const useCategory = (categories:_CategoryType[]) => {

    const [_categories, _setCategories] = useState<_CategoryType[]>(categories);
    
    const handleAdd = (category: CategoryToAdd) => {

        postCategory({
            type: 'add', 
            data: category, 
            onSuccess: (newCategory) => {
                const cats = _categories.map(cat => {
                    if(cat.newest)
                        cat.newest = false;
                    
                    return cat;
                });
    
                newCategory.new = true;
                newCategory.newest = true;
    
    
                _setCategories([newCategory, ...cats]);
            }});            


        
    }




    return {
        handleAdd,
        _categories
    }

}



export default useCategory;