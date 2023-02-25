import { ChangeEventHandler } from 'react';
import { useContext, useState, useEffect } from 'react';

import { AdminContext } from '../../../Context';

import { _ProductType } from '../../../types';
import { ProductGroupType } from '../../../../database';
import { getProductsByCategoryID } from '../../../reducer/actions.Products';

const useEdit = () => {
    const { state } = useContext(AdminContext);

    const { categories, products } = state;   
    const [selectedCategoryID, setSelectedCategoryID] = useState<string>('');
    

    // set default category
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
        currentProducts:getProductsByCategoryID(selectedCategoryID, state)
    }
};

export default useEdit;