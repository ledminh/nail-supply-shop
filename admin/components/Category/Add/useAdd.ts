import { useState, useContext } from 'react';
import { addCategory } from '../../../reducer/actions.Categories';
import postCategory from '../../../tools/postCategory';
import { CategoryToAdd } from '../../../types';

import { AdminContext } from '../../../Context';

const useAdd = () => {

    const {dispatch} = useContext(AdminContext);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imgPath, setImgPath] = useState<string|null>(null);


    const reset = () => {
        setName('');
        setDescription('');
        setImgPath(null);
    }





    /**********************************
     * Public functions
     */
    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    }

    const onImgPathChange = (imgPath:string|null) => {
        setImgPath(imgPath);
    }

    const onAdd = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const categoryToAdd:CategoryToAdd = {
            name,
            description,
            imageUrl: imgPath || ''
        };

        postCategory({
            type: 'add',
            data: categoryToAdd,
            onSuccess: (newCategory) => {
                if(newCategory){
                    addCategory(newCategory, dispatch);
                }
            }
        });       

        reset();
    
    }

    const onCancel = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        reset();
    }

    return {
        name,
        onNameChange,
        description,
        onDescriptionChange,
        imgPath,
        onImgPathChange,
        onAdd,
        onCancel
    }


}

export default useAdd;