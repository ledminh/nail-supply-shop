import { useState, createContext, Dispatch, SetStateAction } from 'react';


export type AdminContextType = {
    isCatImageModalShown: boolean;
    setCatImageModalShow: (shown:boolean) => void;
    onCatImageModalSaved: (file:File) => void;
    currentCatImageFile: File|null;
    setCurrentCatImageFile: (file:File|null) => void;
    
}

type useAdminContextType =  () => AdminContextType;


const adminContextDefaultValues: AdminContextType = {
    isCatImageModalShown: false,
    setCatImageModalShow: () => {},
    onCatImageModalSaved: () => {},
    currentCatImageFile: null,
    setCurrentCatImageFile: () => {}
};


const AdminContext = createContext<AdminContextType>(adminContextDefaultValues);

export const useAdminContext:useAdminContextType = () => {
    const [isCatImageModalShown, setCatImageModalShow] = useState(false);
    const [currentCatImageFile, setCurrentCatImageFile] = useState<File|null>(null);

    const onCatImageModalSaved = (file:File) => {
        setCurrentCatImageFile(file);
    }    

    return {
        isCatImageModalShown,
        setCatImageModalShow,
        onCatImageModalSaved,
        currentCatImageFile,
        setCurrentCatImageFile
    };
}

export default AdminContext;