import { ChangeEventHandler, useEffect, useState } from 'react';
import { AddFormData } from '.';


type useAddFormParams = {
    onChange: (data: AddFormData) => void;
}

const useAddForm = ({onChange}:useAddFormParams) => {
    
    const [productName, setProductName] = useState('');
    const [serialNumber, setSerialNumber] = useState(''); 
    const [shortDescription, setShortDescription] = useState('');
    const [fullDescription, setFullDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [files, setFiles] = useState<File[]>([]);
    
    
    
    useEffect(() => {
        onChange({
            productName,
            serialNumber,
            shortDescription,
            fullDescription,
            price,
            files
        });
    }, [productName, serialNumber, shortDescription, fullDescription, price, files]);
    
    
    
    /*********************************
     * Public methods
     */
    const onProductNameChange:ChangeEventHandler<HTMLInputElement> = (e) => {
        setProductName(e.target.value);
    }

    const onSerialNumberChange:ChangeEventHandler<HTMLInputElement> = (e) => {
        setSerialNumber(e.target.value);
    }

    const onShortDescriptionChange:ChangeEventHandler<HTMLInputElement> = (e) => {
        setShortDescription(e.target.value);
    }

    const onFullDescriptionChange:ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        setFullDescription(e.target.value);
    }

    const onPriceChange:ChangeEventHandler<HTMLInputElement> = (e) => {
        setPrice(Number(e.target.value));
    }

    const onFilesChange:ChangeEventHandler<HTMLInputElement> = (e) => {
        const newFiles = Array.from(e.target.files || []);

        setFiles([...newFiles, ...files]);
    }

    const buttonImageOnClick = (file:File) => {
        
        const newFiles = files.filter(f => f !== file);

        setFiles(newFiles);

    }

    return {
        productName,
        onProductNameChange,
        serialNumber,
        onSerialNumberChange,
        shortDescription,
        onShortDescriptionChange,
        fullDescription,
        onFullDescriptionChange,
        price,
        onPriceChange,
        files,
        onFilesChange,
        buttonImageOnClick
    }
}

export default useAddForm;