import { CategoryType } from '../../../database';
import { NewCategoryType } from './Add';

import axios from 'axios';


const useCategory = (categories:CategoryType[]) => {

    
    const handleAdd = (formData:FormData) => {
        axios.post('/api/category', formData,
        {
            headers: {
              "Content-Type": "multipart/form-data"
            }
        })
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }


    return {
        handleAdd
    }

}



export default useCategory;