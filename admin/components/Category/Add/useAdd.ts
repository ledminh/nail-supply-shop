import { useState, useContext } from 'react';
import { addCategory } from '../../../reducer/actions.Categories';

import { CategoryToAdd } from '../../../types';

import { AdminContext } from '../../../Context';

import upload from '../../../tools/upload';

const useAdd = () => {

    const {dispatch} = useContext(AdminContext);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState<File|null>(null);

    const reset = () => {
        setName('');
        setDescription('');
        setFile(null);
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


    const onAdd = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if(!file)  return; 

        upload({
            type: 'cat-image',
            file,
        }).then((res) => {
            const imgUrl = `/images/category/${res.data.filename}`;

            const categoryToAdd:CategoryToAdd = {
                name,
                description,
                imageUrl: imgUrl
            };

            addCategory(categoryToAdd, dispatch);

            reset();
        });



        
    
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
        file,
        setFile,
        onAdd,
        onCancel
    }


}

export default useAdd;