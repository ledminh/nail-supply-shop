import { useState, createContext } from 'react';

import axios from 'axios';

import { CategoryRequestBody } from '../types';


export type AdminContextType = {
    isCatImageModalShown: boolean;
    openCatImageModal: (catID: string) => void;
    closeCatImageModal: () => void;
    saveImage: (file:File) => void;
    currentCatImageFile: File|null;
    setCurrentCatImageFile: (file:File|null) => void;
    currentCatID: string|null;
    deleteCat: (catID:string) => void;
    deletedCatID: string|null;
    
}

type useAdminContextType =  () => AdminContextType;


const adminContextDefaultValues: AdminContextType = {
    isCatImageModalShown: false,
    openCatImageModal: () => {},
    closeCatImageModal: () => {},
    saveImage: () => {},
    currentCatImageFile: null,
    setCurrentCatImageFile: () => {},
    currentCatID: null,
    deleteCat: () => {},
    deletedCatID: null
};


const AdminContext = createContext<AdminContextType>(adminContextDefaultValues);

export const useAdminContext:useAdminContextType = () => {
    const [isCatImageModalShown, setCatImageModalShow] = useState(false);
    const [currentCatImageFile, setCurrentCatImageFile] = useState<File|null>(null);
    const [currentCatID, setCurrentCatID] = useState<string|null>(null);

    const [deletedCatID, setDeletedCatID] = useState<string|null>(null);

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

    const deleteCat = (catID:string) => {
        const reqBody:CategoryRequestBody = {
            type: 'delete',
            data: {
                id: catID
            }
        }

        axios.post('/api/category', reqBody,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(({data}) => {
            const { success } = data;

            if(success) {
                // delete the category from screen
                setDeletedCatID(catID);
            }
            else {
                const { message } = data;
                throw new Error(message);
            }
        }
        ).catch(err => {
            throw err;
        });



    }

    return {
        isCatImageModalShown,
        openCatImageModal,
        closeCatImageModal,
        saveImage,
        currentCatImageFile,
        setCurrentCatImageFile,
        currentCatID,
        deleteCat,
        deletedCatID
    };
}

export default AdminContext;