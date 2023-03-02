import { useState, useEffect } from 'react';

import { _ProductType } from '../../../../types';

type useProductParams = {
    product: _ProductType;
}

const useProduct = ({product}: useProductParams) => {
    const [editMode, setEditMode] = useState(false);


    /*******************************
     *  Public methods
     */
    const onDelete = () => {}


    return {
        editMode, 
        setEditMode,
        onDelete
    }
}

export default useProduct;