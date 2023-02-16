import {useContext, ChangeEvent} from 'react';
import AdminContext from '../Context/AdminContext';

import {useState} from 'react';


const useCatImage = () => {
    const {isCatImageModalShown, setCatImageModalShow, onCatImageModalSaved} = useContext(AdminContext);

    const [file, setFile] = useState<File|null>(null);

    /**************************
     * Public API
     */
    const shown = isCatImageModalShown;
    const setShown = setCatImageModalShow;

    const onDelete = () => {
        setFile(null);
    }

    const onCancel = () => {
        setShown(false);
        setFile(null);
    }

    const onSave = () => {
        setShown(false);

        
        if(file) {
            // do something with the file ...
            onCatImageModalSaved(file);
        }

        // ... before clearing it
        setFile(null);
    }

    const onFileChange = (event: ChangeEvent<HTMLInputElement>) => event.target.files?[0]? setFile(event.target.files[0]): null: null;

    return {
        shown,
        setShown,
        file,
        onFileChange,
        onCancel,
        onSave,
        onDelete
    } 

}

export default useCatImage;