import { useState } from 'react';

import { _CategoryType } from '../../types';
import { useContext } from 'react';

import AdminContext from '../../../Context/AdminContext';

type Props = {
    category: _CategoryType;
}



const useItem = ({category}:Props) => {
    const [editMode, setEditMode] = useState(false);
    const [_category, _setCategory] = useState<_CategoryType>(category);
    
    const {deleteCat} = useContext(AdminContext);

    const onDelete = () => {
        deleteCat(_category.id);
    }

    return {
        editMode,
        setEditMode,
        _category,
        _setCategory,
        onDelete
    };
}

export default useItem;