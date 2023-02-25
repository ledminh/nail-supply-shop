import { useState, useEffect, useContext, ChangeEventHandler } from "react";
import { AdminContext } from "../../../../Context";
import { getCategories } from "../../../../reducer/actions.Categories";

import { AddFormData, isAddFormDataValid } from "../AddForm";

type useGroupAddParams = {
    setIsDataValid: (isDataValid: boolean) => void;
}

const useGroupAdd = ({
    setIsDataValid,
}: useGroupAddParams) => {

    const { state } = useContext(AdminContext);
    
    const [selectedCategoryID, setSelectedCategoryID] = useState<string>('');


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

        setIsDataValid(isAddFormDataValid(data));

    
    }




    return {
        categories: getCategories(state),
        selectedCategoryID,
        onCategoryChange,
        onAddFormChange
    }
}

export default useGroupAdd;