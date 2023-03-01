import { ChangeEventHandler, useContext, useEffect, useState } from 'react';

import { AdminContext } from '../../../Context';

import { getProductsByCategoryID } from '../../../reducer/actions.Products';
import { _ProductGroupType, _ProductType } from '../../../types';

const useEdit = () => {
    const { state } = useContext(AdminContext);

    const { categories, products } = state;   
    const [selectedCategoryID, setSelectedCategoryID] = useState<string>('');
    const [currentProducts, setCurrentProducts] = useState<(_ProductType|_ProductGroupType)[]>([]);


    // set default category
    useEffect(() => {
        if(categories.length === 0) return;


        setSelectedCategoryID(categories[0].id);
        setCurrentProducts(getProductsByCategoryID(categories[0].id, state));
        
    }, [categories]);

    useEffect(() => {

        setCurrentProducts(getProductsByCategoryID(selectedCategoryID, state));

    }, [selectedCategoryID, products]);




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