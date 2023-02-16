import {useState, createContext} from 'react';

export type AdminContextType = {
    isCatImageModalShown: boolean;
    setCatImageModalShow: (isCatImageShown: boolean) => void;
    setCatImageFileForm: (file:FormData|null) => void;
}

type useAdminContextType =  () => AdminContextType;


const adminContextDefaultValues: AdminContextType = {
    isCatImageModalShown: false,
    setCatImageModalShow: () => {},
    setCatImageFileForm: () => {},
};


const AdminContext = createContext<AdminContextType>(adminContextDefaultValues);

export const useAdminContext:useAdminContextType = () => {
    const [isCatImageModalShown, setCatImageModalShow] = useState(false);

    const [catImageFileForm, setCatImageFileForm] = useState<FormData|null>(null);


    return {
        isCatImageModalShown,
        setCatImageModalShow,
        setCatImageFileForm,
    };
}

export default AdminContext;