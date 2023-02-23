import { useState } from 'react';


import { _CategoryType } from '../../../../types';
import { useContext } from 'react';

import { AdminContext } from '../../../../Context';
import { setToBeDeletedCategory, deleteCategory } from '../../../../reducer/actions.Categories';
import postCategory from '../../../../tools/postCategory';


type Props = {
    category: _CategoryType;
}



const useItem = ({category}:Props) => {
    const [editMode, setEditMode] = useState(false);
    
    const {dispatch} = useContext(AdminContext);

    const deleteWithEffect = () => {
        setToBeDeletedCategory(category.id, dispatch);

        setTimeout(() => {
            deleteCategory(category.id, dispatch);
        }, 500);
    }


    /*********************************
     *  Public Functions
     */
    const onDelete = () => {
        

        postCategory({
            type: 'delete',
            data: {id: category.id},
            onSuccess: (res) => {
                if(res === null){
                    deleteWithEffect();
                }
            }
        })


    }


    return {
        editMode,
        setEditMode,
        onDelete
    };
}

export default useItem;