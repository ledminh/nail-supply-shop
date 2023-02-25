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

    const [productGroup, setProductGroup] = useState<ProductGroupToAdd>([]);
    const [currentProductID, setCurrentProductID] = useState<string>('');

    useEffect(() => {
        const categories = getCategories(state);
        if(categories.length === 0) return;

        setSelectedCategoryID(categories[0].id);

    }, []);

    /*************************************
     *  Public methods
     */

    const onCategoryChange:ChangeEventHandler<HTMLSelectElement> = (e) => {
        e.preventDefault();

        setSelectedCategoryID(e.target.value);


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
        _isAddFormDataValid
    }
}

export default useGroupAdd;