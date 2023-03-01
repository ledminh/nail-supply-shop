import { useState } from "react";

import { _ProductType } from "../../../../../types";

type useSingleEditParams = {
    data: _ProductType;
}

const useSingleEdit = ({data}: useSingleEditParams) => {
    const [productName, setProductName] = useState(data.name);
    const [id, setId] = useState(data.id);
    const [shortDescription, setShortDescription] = useState(data.shortDescription);
    const [fullDescription, setFullDescription] = useState(data.fullDescription);
    const [price, setPrice] = useState(data.price);
    const [images, setImages] = useState(data.images);



    /*****************************
     * Public methods
     */
    const onProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductName(e.target.value);
    }

    const onIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setId(e.target.value);
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

    const onSave = () => {
        console.log('Save');
    }

    const onCancel = () => {
        console.log('Cancel');
    }


    return {
        productName,
        onProductNameChange,
        images,
        id,
        onIdChange,
        shortDescription,
        onShortDescriptionChange,
        fullDescription,
        onFullDescriptionChange,
        price,
        onPriceChange,
        onSave,
        onCancel
    }
}

export default useSingleEdit;