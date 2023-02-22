import { useState, useContext } from 'react';
import { addCategory } from '../../../reducer/actions.Categories';

import { CategoryToAdd } from '../../../types';

import { AdminContext } from '../../../Context';

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

    const onFileChange = (file:File|null) => {
        setFile(file);
    }

    const onAdd = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const categoryToAdd:CategoryToAdd = {
            name,
            description,
            imageFile: file 
        };

        addCategory(categoryToAdd, dispatch);

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
        imgPath: file? URL.createObjectURL(file) : null,
        onFileChange,
        onAdd,
        onCancel
    }


}

export default useAdd;