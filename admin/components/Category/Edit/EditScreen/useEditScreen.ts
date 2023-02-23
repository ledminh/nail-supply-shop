import { useState, useContext, useEffect } from 'react';

import { CategoryToUpdate, _CategoryType } from '../../../../types';

import { AdminContext } from '../../../../Context';
import upload from '../../../../tools/upload';
import { setIsEditingImageCategory, updateCategory } from '../../../../reducer/actions.Categories';
import postCategory from '../../../../tools/postCategory';
import { CategoryType } from '../../../../../database';
import { getCategoryImageFromCache } from '../../../../reducer/actions.Cache';



type useEditScreenParams = {
    category: _CategoryType;
    setEditMode: (mode:boolean) => void;
}

const useEditScreen = ({category, setEditMode}: useEditScreenParams) => {
    
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

        const cachedImage = getCategoryImageFromCache(category.id, state);

        if(cachedImage) {
            setImageUrl(URL.createObjectURL(cachedImage));
        }
        else {
            setImageUrl(category.imageUrl);
        }
        
    }, [state.cache.catImageFiles])



    
    const prepareCategory = async () => {
        try {

            let preparedCat:CategoryToUpdate = {
                id: category.id,
                name: categoryName,
                description: categoryDescription,
                imageUrl: category.imageUrl
            }
            
            const cachedImage = getCategoryImageFromCache(category.id, state);

            if(cachedImage) {
                const res = await upload({
                    type: 'cat-image',
                    file: cachedImage,
                });
            
                const { filename } = res.data;
            
                const uploadedImageUrl = `/images/category/${filename}`;
                
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
        setEditMode(false);
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
                        setEditMode(false);
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
        isSaveButtonDisabled: categoryName === category.name && categoryDescription === category.description && !imageUrl,
        onSave
    }

}

export default useEditScreen;





