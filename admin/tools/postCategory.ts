import axios, { AxiosResponse } from 'axios';
import { CategoryType } from '../../database';
import {  CategoryRequestBody } from '../types';

type Props = {
    onSuccess: (category:CategoryType|null) => void;
} & CategoryRequestBody;

const postCategory = async ({type, data, onSuccess}: Props) => {

    const reqBody = {
        type: type,
        data: data
    } 

    axios.post('/api/category', reqBody,
    {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        const { success } = res.data;

        if(success) {
            if(type === 'add'){
                const newCategory:CategoryType = res.data.category;

                onSuccess(newCategory);
            }
            else if (type === 'delete') {
                onSuccess(null);
            }
        }
        else {
            const { message } = res.data;
            throw new Error(message);
        }
    })
    .catch(err => {
        throw new Error(err);
    });

    

}

export default postCategory;