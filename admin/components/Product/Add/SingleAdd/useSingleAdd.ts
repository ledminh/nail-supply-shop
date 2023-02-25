import { ChangeEventHandler, useContext, useState, useEffect } from 'react';
import { SingleAddData } from '.';
import { AdminContext } from '../../../../Context';

import { getCategories } from '../../../../reducer/actions.Categories';
import { AddFormData, isAddFormDataValid } from '../AddForm';

type useSingleAddParams = {
    setIsDataValid: (isDataValid: boolean) => void;
    onProductChange: (productData: SingleAddData) => void;
}

const useSingleAdd = ({setIsDataValid, onProductChange}: useSingleAddParams) => {

    const { state } = useContext(AdminContext);

    
    const [productData, setProductData] = useState<SingleAddData|null>(null);
    const [selectedCategoryID, setSelectedCategoryID] = useState<string>('');


    useEffect(() => {
        const categories = getCategories(state);
        if(categories.length === 0) return;

        setSelectedCategoryID(categories[0].id);

    }, []);


    useEffect(() => {
        if(!productData) return;

        onProductChange(productData);

    }, [productData]);



    /*************************************
     *  Public methods
     */

    const onCategoryChange:ChangeEventHandler<HTMLSelectElement> = (e) => {
        e.preventDefault();

        setSelectedCategoryID(e.target.value);


    }

    const onAddFormChange = (data: AddFormData) => {
        const isDataValid = isAddFormDataValid(data);

        setIsDataValid(isAddFormDataValid(data));

        
        if(!isDataValid) {
            setProductData(null);
            return;
        };

        setProductData({
            ...data,
            categoryID: selectedCategoryID
        });
    }



    return {
        categories: getCategories(state),
        selectedCategoryID,
        onCategoryChange,
        onAddFormChange
    }
}

export default useSingleAdd;