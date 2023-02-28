import { useEffect, useState } from 'react';
import { _ProductGroupType } from '../../../../types';

type useProductGroupParams = {
    productGroup: _ProductGroupType
}

const useProductGroup = ({productGroup}: useProductGroupParams) => {
    
    const [currentProduct, setCurrentProduct] = useState(productGroup[0]); 
    const [editMode, setEditMode] = useState(false);




    /*******************************
     * Public methods
     */ 
    const onDelete = () => {}

    return {
        editMode,
        setEditMode,
        currentProduct,
        setCurrentProduct,
        onDelete
    }
}

export default useProductGroup;