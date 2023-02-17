import axios, {AxiosResponse} from 'axios';

import { DeleteFileRequestBody } from '../types';

type Props = {
    type: 'cat-image' | 'product-image',
    fileName: string,
}

const deleteFile = ({type, fileName}:Props) => {
    try {
        const reqBody:DeleteFileRequestBody = {
            type: type,
            fileName,
        } 
    
        const res = axios.post('/api/delete', 
                reqBody,
                { headers: {'content-type': 'application/json'}}
                );
    
        return res;
    }
    catch(err) {
        throw err;
    }

}

export default deleteFile;