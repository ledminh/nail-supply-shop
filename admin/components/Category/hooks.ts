import { useContext } from 'react';
import { CategoryToAdd } from '../../types';

import postCategory from '../../tools/postCategory';
import { addCategory } from '../../reducer/actions.Categories';
import { AdminContext } from '../../Context';



const useCategory = () => {
    
    const {dispatch} = useContext(AdminContext);


    const handleAdd = (category: CategoryToAdd) => {

        postCategory({
            type: 'add', 
            data: category, 
            onSuccess: (newCategory) => addCategory(newCategory, dispatch)
        });            
        
    }


    return {
        handleAdd,
    }

}



export default useCategory;