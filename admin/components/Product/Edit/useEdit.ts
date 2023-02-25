import { ChangeEventHandler } from 'react';
import { useContext, useState, useEffect } from 'react';
import { AdminContext } from '../../../Context';




const useEdit = () => {
    const { state } = useContext(AdminContext);

    const { categories } = state;   
    const [selectedCategoryID, setSelectedCategoryID] = useState<string>('');
 
    useEffect(() => {
        if(categories.length === 0) return;

        setSelectedCategoryID(categories[0].id);

    }, [categories]);


    /*************************************
     *  Public methods
     */

    const onCategoryChange:ChangeEventHandler<HTMLSelectElement> = (e) => {
        e.preventDefault();

        setSelectedCategoryID(e.target.value);


    }



    return {
        categories,
        selectedCategoryID,
        onCategoryChange,
    }
};

export default useEdit;