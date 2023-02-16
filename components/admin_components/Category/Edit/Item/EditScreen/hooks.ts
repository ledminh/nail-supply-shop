import { useState } from 'react';
import { _CategoryType } from '../../../types';
import { useContext } from 'react';

import { CategoryType } from '../../../../../../database';
import AdminContext from '../../../../Context/AdminContext';

import axios from 'axios';
import { CategoryRequestBody } from '../../../../../../types';

type useEditScreenParams = {
    category: _CategoryType;
    setCategory: (category: _CategoryType) => void;
    setEditMode: (editMode:boolean) => void;
}

const useEditScreen = ({category, setCategory, setEditMode}: useEditScreenParams) => {
    // from Contexts
    const {setCatImageModalShow, currentCatImageFile, setCurrentCatImageFile} = useContext(AdminContext);
    
    
    
    // private state
    const [categoryName, setCategoryName] = useState(category.name);
    const [categoryDescription, setCategoryDescription] = useState(category.description);


    
    const updateCategory = async () => {
        try {
            let data = {
                id: category.id,
                name: categoryName,
                description: categoryDescription,
                imageUrl: category.imageUrl
            }
    
            if(currentCatImageFile) {
                const imageUrl = await uploadImage(currentCatImageFile);
    
                data = {
                    ...data,
                    imageUrl: imageUrl
                }
            }
    
            const reqBody:CategoryRequestBody = {
                type: 'edit',
                data: data
            }
    
    
            const updatedCategory = await updateCategoryInfo(reqBody);
    
            return updatedCategory;
        }
        catch(err) {
            throw err;
        }
    }
  
    /******************************
     *  Public functions          *
     */
    const onCategoryNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategoryName(e.target.value);
    }

    const onCategoryDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCategoryDescription(e.target.value);
    }

    const onImageClick = () => {
        setCatImageModalShow(true);
    }

    const onSave = () => {
       
        updateCategory().then((updatedCategory) => {
            setCategory({
                ...category,
                ...updatedCategory
            });

            setEditMode(false);
            setCurrentCatImageFile(null);    
        })
        
        

        

        
    }

    const onCancel = () => {
        setEditMode(false);
    }

    return {
        categoryName,
        categoryDescription,
        currentCatImageFile,
        onCategoryNameChange,
        onCategoryDescriptionChange,
        onImageClick,
        onSave,
        onCancel
    }

}

export default useEditScreen;


/**********************************
 * Private functions             *
 */



const uploadImage = async (imgFile: File) => {
    const config = {
        headers: { 'content-type': 'multipart/form-data' },
    };

    const formData = new FormData();
    formData.append('cat-image', imgFile);
    
    try {
        const res = await axios.post('/api/upload', formData, config);
        const { filename } = res.data;
        
        return `/images/category/${filename}`;
    }
    catch(err) {
        throw err;
    }
    

    

}

const updateCategoryInfo = async (reqBody: CategoryRequestBody) => {
    const res = await axios.post('/api/category', 
                                    reqBody, {
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                });

    const { success } = res.data;

    if(success) {
        const { category } = res.data;
        return category as CategoryType;
    }
    else {
        const { message } = res.data;
        throw new Error(message);
    }
}

