import axios, { AxiosResponse } from 'axios';
import { ProductType } from '../../database';
import {  ProductRequestBody } from '../types';

type Props = {
    onSuccess: (product:ProductType|null) => void;
} & ProductRequestBody;

const postProduct = async ({type, data, onSuccess}: Props) => {

    const reqBody = {
        type: type,
        data: data
    } 

    axios.post('/api/product', reqBody,
    {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        const { success } = res.data;

        if(success) {
            if(type === 'add'){
                const newProduct:ProductType = res.data.product;

                onSuccess(newProduct);
            }
            else if (type === 'update') {
                // const updatedCategory:CategoryType = res.data.category;

                // onSuccess(updatedCategory);
            }
            else if (type === 'delete') {
                // onSuccess(null);
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

export default postProduct;