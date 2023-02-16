import {useState, createContext} from 'react';

export type AdminContextType = {
    isCatImageModalShown: boolean;
    setCatImageModalShow: (isCatImageShown: boolean) => void;
    
}

type useAdminContextType =  () => AdminContextType;


const adminContextDefaultValues: AdminContextType = {
    isCatImageModalShown: false,
    setCatImageModalShow: () => {}
};


const AdminContext = createContext<AdminContextType>(adminContextDefaultValues);

export const useAdminContext:useAdminContextType = () => {
    const [isCatImageModalShown, setCatImageModalShow] = useState(false);

    


    return {
        isCatImageModalShown,
        setCatImageModalShow,
        

    };
}

export default AdminContext;