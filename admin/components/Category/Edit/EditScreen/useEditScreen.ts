import { useState, useContext } from 'react';

import { CategoryType } from '../../../../../database';
import { AdminContext } from '../../../../Context';
import axios from 'axios';
import upload from '../../../../tools/upload';
import { setIsEditingImageCategory } from '../../../../reducer/actions.Categories';



type useEditScreenParams = {
    category: _CategoryType;
    setCategory: (category: _CategoryType) => void;
    setEditMode: (editMode:boolean) => void;
}

const useEditScreen = ({category, setCategory, setEditMode}: useEditScreenParams) => {
    
    const {openCatImageModal, dispatch} = useContext(AdminContext);


    // private state
    const [categoryName, setCategoryName] = useState(category.name);
    const [categoryDescription, setCategoryDescription] = useState(category.description);

    // const [imageFile, setImageFile] = useState<File|null>(null);

    // useEffect(() => {
        
    //     if(currentCatID === category.id) {
    //         setImageFile(currentCatImageFile);
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [currentCatImageFile])
   

    
    // const updateCategory = async () => {
    //     try {
    //         let data = {
    //             id: category.id,
    //             name: categoryName,
    //             description: categoryDescription,
    //             imageUrl: category.imageUrl
    //         }
    
    //         if(imageFile) {
    //             const imageUrl = await uploadImage(imageFile);
    
    //             data = {
    //                 ...data,
    //                 imageUrl: imageUrl
    //             }
    //         }
    
    //         const reqBody:CategoryRequestBody = {
    //             type: 'edit',
    //             data: data
    //         }
    
    
    //         const updatedCategory = await updateCategoryInfo(reqBody);
    
    //         return updatedCategory;
    //     }
    //     catch(err) {
    //         throw err;
    //     }
    // }
  
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
        // setImageFile(null);
    }

    const onImageClick = () => {
        setIsEditingImageCategory(category.id, dispatch);
        openCatImageModal();
    }

    // const onSave = () => {
    //     updateCategory().then((updatedCategory) => {
    //         setCategory({
    //             ...category,
    //             ...updatedCategory
    //         });

    //         setEditMode(false);
    //     }) 
    // }



    return {
        categoryName,
        onCategoryNameChange,
        categoryDescription,
        onCategoryDescriptionChange,
        onImageClick,
        // imageFile,
        // onSave,
        onCancel
    }

}

export default useEditScreen;


/**********************************
 * Private functions             *
 */



const uploadImage = async (imgFile: File) => {
    upload({
        type: 'cat-image',
        file: imgFile,
    })
    .then((res) => {
        const { filename } = res.data;
    
        return `/images/category/${filename}`;
    
    })
    .catch((err) => {
        throw err;
    }); 
    

    

}

// const updateCategoryInfo = async (reqBody: CategoryRequestBody) => {
//     const res = await axios.post('/api/category', 
//                                     reqBody, {
//                                     headers: {
//                                         'Content-Type': 'application/json'
//                                     }
//                                 });

//     const { success } = res.data;

//     if(success) {
//         const { category } = res.data;
//         return category as CategoryType;
//     }
//     else {
//         const { message } = res.data;
//         throw new Error(message);
//     }
// }

