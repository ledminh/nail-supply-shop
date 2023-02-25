import axios from 'axios';

type Props = {
    onUploadProgress?: (event: any) => void;
} & ({
    type: 'cat-image',
    file: File,
    files?: undefined,
}| {
    type: 'product-images',
    files: File[],
    file?: undefined,
});

const upload = ({ type, file, files, onUploadProgress }: Props) => {
    const config = {
        headers: { 'content-type': 'multipart/form-data' },
        onUploadProgress: onUploadProgress,
    };

    const formData = new FormData();
    let uploadUrl = '/api/upload';

    // If file is an array, append each file to the form data
    if (type === 'product-images') {
        uploadUrl += '?type=product-images'
        files.forEach((f) => {
            formData.append("product-images", f);
        });
    } else {
        uploadUrl += '?type=cat-image';
        formData.append("cat-image", file);
    }


    const res = axios.post(uploadUrl, formData, config);

    return res;
};

export default upload;
