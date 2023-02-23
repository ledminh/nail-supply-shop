import { useContext } from 'react';
import { AdminContext } from '../../../Context';


const useAdd = () => {
    const {state} = useContext(AdminContext);

    







    /*************************************
     *  Public methods
     */
    

    const onAddClick = () => {
    }

    const onCancelClick = () => {
    }




    
    return {
        onAddClick,
        onCancelClick
    }
}

export default useAdd;