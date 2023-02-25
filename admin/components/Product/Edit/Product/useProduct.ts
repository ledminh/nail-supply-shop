import { useState } from 'react';


type useProductParams = {
}

const useProduct = ({}: useProductParams) => {
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