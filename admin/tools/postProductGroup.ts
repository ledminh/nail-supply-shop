import axios from 'axios';
import { ProductGroupType } from '../../database';
import { ProductGroupRequestBody } from '../types';

type Props = {
    onSuccess: (productGroup:ProductGroupType|null) => void;
} & ProductGroupRequestBody;

const postProductGroup = async ({type, data, onSuccess}: Props) => {

    const reqBody = {
        type: type,
        data: data
    } 

    axios.post('/api/product-group', reqBody,
    {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        const { success } = res.data;

        if(success) {
            if(type === 'add'){
                const newProductGroup:ProductGroupType = res.data.productGroup;

                onSuccess(newProductGroup);
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

export default postProductGroup;