import { useContext, useState } from 'react';
import { AdminContext } from '../../../Context';
import { getCategories } from '../../../reducer/actions.Categories';


const useAdd = () => {
    const {state} = useContext(AdminContext);

    const [productName, setProductName] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [fullDescription, setFullDescription] = useState('');







    /*************************************
     *  Public methods
     */
    const onCategoryChange = (e: any) => {
    }

    const onProductNameChange = (e: any) => {
    }

    const onShortDescriptionChange = (e: any) => {
    }

    const onFullDescriptionChange = (e: any) => {
    }

    const onAddClick = () => {
    }

    const onCancelClick = () => {
    }




    
    return {
        onCategoryChange,
        categories: getCategories(state),
        productName,
        onProductNameChange,
        shortDescription,
        onShortDescriptionChange,
        fullDescription,
        onFullDescriptionChange,
        onAddClick,
        onCancelClick
    }
}

export default useAdd;