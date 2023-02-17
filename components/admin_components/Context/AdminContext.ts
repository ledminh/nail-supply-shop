import { useState, createContext, Dispatch, SetStateAction } from 'react';


export type AdminContextType = {
    isCatImageModalShown: boolean;
    openCatImageModal: (catID: string) => void;
    closeCatImageModal: () => void;
    saveImage: (file:File) => void;
    currentCatImageFile: File|null;
    setCurrentCatImageFile: (file:File|null) => void;
    currentCatID: string|null;
    
}

type useAdminContextType =  () => AdminContextType;


const adminContextDefaultValues: AdminContextType = {
    isCatImageModalShown: false,
    openCatImageModal: () => {},
    closeCatImageModal: () => {},
    saveImage: () => {},
    currentCatImageFile: null,
    setCurrentCatImageFile: () => {},
    currentCatID: null
};


const AdminContext = createContext<AdminContextType>(adminContextDefaultValues);

export const useAdminContext:useAdminContextType = () => {
    const [isCatImageModalShown, setCatImageModalShow] = useState(false);
    const [currentCatImageFile, setCurrentCatImageFile] = useState<File|null>(null);
    const [currentCatID, setCurrentCatID] = useState<string|null>(null);



    /**************************
     * Public API   
     */

    const saveImage = (file:File) => {
        setCurrentCatImageFile(file);
    }    

    const openCatImageModal = (catID:string) => {
        setCatImageModalShow(true);
        setCurrentCatID(catID);
    }

    const closeCatImageModal = () => {
        setCatImageModalShow(false); 
    }

    return {
        isCatImageModalShown,
        openCatImageModal,
        closeCatImageModal,
        saveImage,
        currentCatImageFile,
        setCurrentCatImageFile,
        currentCatID
    };
}

export default AdminContext;