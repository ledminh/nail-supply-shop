import { useState, useContext, useEffect } from 'react';

import { CategoryToUpdate, _CategoryType } from '../../../../types';

import { AdminContext } from '../../../../Context';
import upload from '../../../../tools/upload';
import { setIsEditingImageCategory, updateCategory } from '../../../../reducer/actions.Categories';
import postCategory from '../../../../tools/postCategory';
import { CategoryType } from '../../../../../database';



type useEditScreenParams = {
    category: _CategoryType;
    toggleEditMode: () => void;
}

const useEditScreen = ({category, toggleEditMode}: useEditScreenParams) => {
    
    const {openCatImageModal, dispatch, state} = useContext(AdminContext);


    // private state
    const [categoryName, setCategoryName] = useState(category.name);
    const [categoryDescription, setCategoryDescription] = useState(category.description);

    const [imageUrl, setImageUrl] = useState<string>(category.imageUrl);

    const reset = () => {
        setCategoryName(category.name);
        setCategoryDescription(category.description);
        setImageUrl(category.imageUrl);
    }


    useEffect(() => {
        if(category.isEditingImage){
            if(state.cache.catImageFile) {
                setImageUrl(URL.createObjectURL(state.cache.catImageFile));
            }
            else {
                setImageUrl(category.imageUrl);
            }
        }
    }, [state.cache.catImageFile]);



    
    const prepareCategory = async () => {
        try {

            let preparedCat:CategoryToUpdate = {
                id: category.id,
                name: categoryName,
                description: categoryDescription,
                imageUrl: category.imageUrl
            }
    
            if(state.cache.catImageFile) {
                const uploadedImageUrl = await uploadImage(state.cache.catImageFile);
                preparedCat = {
                    ...preparedCat,
                    imageUrl: uploadedImageUrl
                }
            }
            
            return preparedCat;
    
            
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

    const onCancel = () => {
        toggleEditMode();
        reset();
    }

    const onImageClick = () => {
        setIsEditingImageCategory(category.id, true, dispatch);
        openCatImageModal();
    }

    const onSave = () => {
         prepareCategory()
            .then((preparedCat) => {
                
                postCategory({
                    type: 'update',
                    data: preparedCat,
                    onSuccess: (updatedCat) => {
                        updateCategory(updatedCat as CategoryType, dispatch);
                        toggleEditMode();
                    }
                })

            })  
        
    }





    return {
        categoryName,
        onCategoryNameChange,
        categoryDescription,
        onCategoryDescriptionChange,
        onImageClick,
        onCancel,
        imageUrl,
        isSaveButtonDisabled: categoryName === category.name && categoryDescription === category.description && !state.cache.catImageFile,
        onSave
    }

}

export default useEditScreen;


/**********************************
 * Private functions             *
 */



const uploadImage = async (imgFile: File) => {
    const res = await upload({
        type: 'cat-image',
        file: imgFile,
    });

    const { filename } = res.data;

    return `/images/category/${filename}`;

}   



