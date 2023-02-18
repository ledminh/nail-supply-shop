import {useContext, ChangeEvent} from 'react';
import AdminContext from '../Context/useAdminContext';

import {useState} from 'react';


const useCatImage = () => {
    const {isCatImageModalShown, closeCatImageModal, saveImage} = useContext(AdminContext);

    const [file, setFile] = useState<File|null>(null);

    /**************************
     * Public API
     */
    const shown = isCatImageModalShown;

    const onDelete = () => {
        setFile(null);
    }

    const onCancel = () => {
        closeCatImageModal();
        setFile(null);
    }

    const onSave = () => {
        closeCatImageModal();

        
        if(file) {
            // do something with the file ...
            saveImage(file);
        }

        // ... before clearing it
        setFile(null);
    }

    const onFileChange = (event: ChangeEvent<HTMLInputElement>) => event.target.files?[0]? setFile(event.target.files[0]): null: null;

    return {
        shown,
        file,
        onFileChange,
        onCancel,
        onSave,
        onDelete
    } 

}

export default useCatImage;