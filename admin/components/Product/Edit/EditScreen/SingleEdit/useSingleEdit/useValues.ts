import { useState } from 'react';


type Props = {
    initProductName: string;
    initShortDescription: string;
    initFullDescription: string;
    initPrice: number;
}

const useValues = ({ initProductName, initShortDescription, initFullDescription, initPrice}:Props) => {

    const [productName, setProductName] = useState(initProductName);
    
    const [shortDescription, setShortDescription] = useState(initShortDescription);
    const [fullDescription, setFullDescription] = useState(initFullDescription);
    const [price, setPrice] = useState(initPrice);

    /**********************
     * Public methods
     */

    const resetValues = () => {
        setProductName(initProductName);
        
        setShortDescription(initShortDescription);
        setFullDescription(initFullDescription);
        setPrice(initPrice);
    }

    const onProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductName(e.target.value);
    }


    const onShortDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShortDescription(e.target.value);
    }

    const onFullDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFullDescription(e.target.value);
    }

    const onPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(Number(e.target.value));
    }

    return {
        productName,
        shortDescription,
        fullDescription,
        price,
        resetValues,
        onProductNameChange,
        onShortDescriptionChange,
        onFullDescriptionChange,
        onPriceChange
    }
}

export default useValues;