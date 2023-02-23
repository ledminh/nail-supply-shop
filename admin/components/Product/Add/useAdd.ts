import { useContext, useState } from 'react';
import { AdminContext } from '../../../Context';
import { getCategories } from '../../../reducer/actions.Categories';


const useAdd = () => {
    const {state} = useContext(AdminContext);

    







    /*************************************
     *  Public methods
     */
    const onCategoryChange = (e: any) => {
    }

    

    const onAddClick = () => {
    }

    const onCancelClick = () => {
    }




    
    return {
        onCategoryChange,
        categories: getCategories(state),
        onAddClick,
        onCancelClick
    }
}

export default useAdd;