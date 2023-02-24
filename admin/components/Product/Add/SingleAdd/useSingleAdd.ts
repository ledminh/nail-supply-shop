import { useContext } from 'react';
import { AdminContext } from '../../../../Context';

import { getCategories } from '../../../../reducer/actions.Categories';
import { AddFormData, isAddFormDataValid } from '../AddForm';

type useSingleAddParams = {
    setIsDataValid: (isDataValid: boolean) => void;
}

const useSingleAdd = ({setIsDataValid}: useSingleAddParams) => {

    const { state } = useContext(AdminContext);
    


    /*************************************
     *  Public methods
     */

    const onCategoryChange = (e: any) => {}

    const onAddFormChange = (data: AddFormData) => {
        setIsDataValid(isAddFormDataValid(data));
    }



    return {
        categories: getCategories(state),
        onCategoryChange,
        onAddFormChange
    }
}

export default useSingleAdd;