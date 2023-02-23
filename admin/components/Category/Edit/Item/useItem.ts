import { useState } from 'react';


import { _CategoryType } from '../../../../types';
import { useContext } from 'react';

import { AdminContext } from '../../../../Context';
import { setToBeDeletedCategory, deleteCategory } from '../../../../reducer/actions.Categories';
import postCategory from '../../../../tools/postCategory';

import deleteFile from '../../../../tools/deleteFile';

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
        
        // delete image
        const imageUrl = category.imageUrl;

        if(imageUrl.indexOf('/images/category/') === 0) {
            const imageName = imageUrl.slice(imageUrl.lastIndexOf('/') + 1);

            deleteFile({
                type: 'cat-image',
                fileName: imageName
            });
        
        }

                




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