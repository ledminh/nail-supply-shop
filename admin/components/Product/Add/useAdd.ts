import { useContext, useState, MouseEventHandler } from 'react';
import { AdminContext } from '../../../Context';


const useAdd = () => {
    const {state} = useContext(AdminContext);

    const [currentMode, setMode] = useState<'single'|'group'>('single');
    const [isDataValid, setIsDataValid] = useState<boolean>(false);    

    /*************************************
     *  Public methods
     */
    

    const onAddClick = () => {
    }

    const onCancelClick = () => {
    }

    const onSingleClick:MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        if(currentMode === 'single') return;
        
        setIsDataValid(false);
        setMode('single');
    }

    const onGroupClick:MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        
        if(currentMode === 'group') return;

        setIsDataValid(false);
        setMode('group');
    }


    
    return {
        currentMode,
        onSingleClick,
        onGroupClick,
        onAddClick,
        onCancelClick,
        isDataValid,
        setIsDataValid
    }
}

export default useAdd;