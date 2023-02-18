import axios from 'axios';

type Props = {
    type: 'cat-image' | 'product-image'
    onUploadProgress?: (event: any) => void;
    file: File;
}

const upload = ({type, file, onUploadProgress}:Props) => {
    const config = {
        headers: { 'content-type': 'multipart/form-data' },
        onUploadProgress: onUploadProgress,
    };

    const formData = new FormData();
    formData.append(type, file);


    const res = axios.post('/api/upload', formData, config);

    return res;
        
}

export default upload;