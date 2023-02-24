import { useContext, useState, MouseEventHandler } from 'react';
import { AdminContext } from '../../../Context';


const useAdd = () => {
    const {state} = useContext(AdminContext);

    const [currentMode, setMode] = useState<'single'|'group'>('single');    

    /*************************************
     *  Public methods
     */
    

    const onAddClick = () => {
    }

    const onCancelClick = () => {
    }

    const onSingleClick:MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();

        setMode('single');
    }

    const onGroupClick:MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        
        setMode('group');
    }


    
    return {
        currentMode,
        onSingleClick,
        onGroupClick,
        onAddClick,
        onCancelClick
    }
}

export default useAdd;