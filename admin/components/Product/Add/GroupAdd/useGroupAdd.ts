import { useState, useEffect, useContext, ChangeEventHandler, MouseEventHandler } from "react";
import { AdminContext } from "../../../../Context";
import { getCategories } from "../../../../reducer/actions.Categories";

import { AddFormData, isAddFormDataValid } from "../AddForm";

import {ProductGroupToAdd} from '.';

type useGroupAddParams = {
}

const useGroupAdd = ({
    
}: useGroupAddParams) => {

    const { state } = useContext(AdminContext);
    
    const [selectedCategoryID, setSelectedCategoryID] = useState<string>('');
    const [isAddFormResetting, setIsAddFormResetting] = useState<boolean>(false);

    const [_isAddFormDataValid, setIsAddFormDataValid] = useState<boolean>(false);


    const [groupName, setGroupName] = useState<string>('');


    const [productGroup, setProductGroup] = useState<ProductGroupToAdd>([]);
    const [currentProductID, setCurrentProductID] = useState<string>('');

    
    
    
    
    
    
    
    useEffect(() => {
        const categories = getCategories(state);
        if(categories.length === 0) return;

        setSelectedCategoryID(categories[0].id);

    }, []);



    const getMainProductID = () => {
        const mainProduct = productGroup.find(product => product.mainProduct === true);

        if(!mainProduct) return '';

        return mainProduct._id;
    }

    /*************************************
     *  Public methods
     */

    const onCategoryChange:ChangeEventHandler<HTMLSelectElement> = (e) => {
        e.preventDefault();

        setSelectedCategoryID(e.target.value);

    }

    const onGroupNameChange:ChangeEventHandler<HTMLInputElement> = (e) => {
        e.preventDefault();

        setGroupName(e.target.value);
    }

    const onMainProductChange:ChangeEventHandler<HTMLSelectElement> = (e) => {
        e.preventDefault();

        const newProductGroup  = productGroup.map(product => {
            return {
                ...product,
                mainProduct: false
                }
        });

        const productID = e.target.value;

        const productIndex = newProductGroup.findIndex(product => product._id === productID);

        newProductGroup[productIndex] = {
            ...newProductGroup[productIndex],
            mainProduct: true        
        }

        setProductGroup(newProductGroup);
    }

    const onAddFormChange = (data: AddFormData) => {
        const isDataValid = isAddFormDataValid(data);

        setIsAddFormDataValid(isDataValid);

            

    
    }

    const onCancel:MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();

        setIsAddFormResetting(true);
    }

    const onAdd:MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();


        setIsAddFormResetting(true);
    }



    return {
        categories: getCategories(state),
        selectedCategoryID,
        onCategoryChange,
        onAddFormChange,
        isAddFormResetting,
        setIsAddFormResetting,
        onCancel,
        onAdd,
        _isAddFormDataValid,
        groupName,
        onGroupNameChange,
        productGroup,
        onMainProductChange,
        mainProductID: getMainProductID()
    }
}

export default useGroupAdd;