import {useContext, ChangeEvent} from 'react';
import {AdminContext} from '../../Context';

import {getCatImgFileFromCache, setCatImgFileOnCache} from '../../reducer/actions.Cache';


const useCatImage = () => {
    const {
        isCatImageModalOpened, 
        closeCatImageModal, 
        state, 
        dispatch
    } = useContext(AdminContext);


    // const [file, setFile] = useState<File|null>(null);

    // /**************************
    //  * Public API
    //  */

    const onDelete = () => {
        setCatImgFileOnCache(null, dispatch);
    }

    const onCancel = () => {
        closeCatImageModal();
        setCatImgFileOnCache(null, dispatch);
    }

    const onSave = () => {
        closeCatImageModal();

        
    }

    const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];

        if(file) {
            setCatImgFileOnCache(file, dispatch);
        }
        else {
            setCatImgFileOnCache(null, dispatch);
        }

    } 


    return {
        shown: isCatImageModalOpened,
        onFileChange,
        file: getCatImgFileFromCache(state),
        onDelete,
        onSave,
        onCancel,
    } 

}

export default useCatImage;