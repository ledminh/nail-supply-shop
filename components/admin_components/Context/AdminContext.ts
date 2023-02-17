import { useState, createContext, Dispatch, SetStateAction } from 'react';


export type AdminContextType = {
    isCatImageModalShown: boolean;
    openCatImageModal: (catID: string) => void;
    closeCatImageModal: () => void;
    onCatImageModalSaved: (file:File) => void;
    currentCatImageFile: File|null;
    setCurrentCatImageFile: (file:File|null) => void;
    
}

type useAdminContextType =  () => AdminContextType;


const adminContextDefaultValues: AdminContextType = {
    isCatImageModalShown: false,
    openCatImageModal: () => {},
    closeCatImageModal: () => {},
    onCatImageModalSaved: () => {},
    currentCatImageFile: null,
    setCurrentCatImageFile: () => {}
};


const AdminContext = createContext<AdminContextType>(adminContextDefaultValues);

export const useAdminContext:useAdminContextType = () => {
    const [isCatImageModalShown, setCatImageModalShow] = useState(false);
    const [currentCatImageFile, setCurrentCatImageFile] = useState<File|null>(null);
    const [currentCatID, setCurrentCatID] = useState<string|null>(null);



    /**************************
     * Public API   
     */

    const onCatImageModalSaved = (file:File) => {
        setCurrentCatImageFile(file);
    }    

    const openCatImageModal = (catID:string) => {
        setCatImageModalShow(true);
        setCurrentCatID(catID);
    }

    const closeCatImageModal = () => {
        setCatImageModalShow(false);

        

        setCurrentCatID(null);
    }

    return {
        isCatImageModalShown,
        openCatImageModal,
        closeCatImageModal,
        onCatImageModalSaved,
        currentCatImageFile,
        setCurrentCatImageFile
    };
}

export default AdminContext;