import { ChangeEventHandler } from 'react';
import { useContext, useState, useEffect } from 'react';

import { AdminContext } from '../../../Context';

import { _ProductType } from '../../../types';
import { ProductGroupType } from '../../../../database';
import { getProductsByCategoryID } from '../../../reducer/actions.Products';

const useEdit = () => {
    const { state } = useContext(AdminContext);

    const { categories } = state;   
    const [selectedCategoryID, setSelectedCategoryID] = useState<string>('');
    
    const [currentProducts, setCurrentProducts] = useState<(_ProductType|ProductGroupType)[]>([]);

    // set default category
    useEffect(() => {
        if(categories.length === 0) return;

        setSelectedCategoryID(categories[0].id);

    }, [categories]);

    
    
    // update product list when user selects other category
    useEffect(() => {
        if(!selectedCategoryID) return;

        setCurrentProducts(getProductsByCategoryID(selectedCategoryID, state));
    }, [selectedCategoryID]);

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
        currentProducts
    }
};

export default useEdit;