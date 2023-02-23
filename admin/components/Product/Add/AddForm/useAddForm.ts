import { ChangeEventHandler, useEffect, useState } from 'react';
import { AddFormData } from '.';


type useAddFormParams = {
    onChange: (data: AddFormData) => void;
}

const useAddForm = ({onChange}:useAddFormParams) => {
    
    const [productName, setProductName] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [fullDescription, setFullDescription] = useState('');
    const [price, setPrice] = useState(0);
    
    
    
    useEffect(() => {
        onChange({
            productName,
            shortDescription,
            fullDescription,
            price
        });
    }, [productName, shortDescription, fullDescription, price]);
    
    
    
    /*********************************
     * Public methods
     */
    const onProductNameChange:ChangeEventHandler<HTMLInputElement> = (e) => {
        setProductName(e.target.value);
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


    return {
        productName,
        onProductNameChange,
        shortDescription,
        onShortDescriptionChange,
        fullDescription,
        onFullDescriptionChange,
        price,
        onPriceChange,
    }
}

export default useAddForm;