import { useReducer, useEffect, useState } from 'react';

import { CategoryType, ProductGroupType, ProductType } from '../../database';

import reducer, {initialState} from '../reducer';

import {setCategories} from '../reducer/actions.Categories';
import {setProducts} from '../reducer/actions.Products';
import {setAboutHtmlText} from '../reducer/actions.AboutHtmlText';

import {StateType, ActionType} from '../reducer/types';
import { _CategoryType } from '../types';


export type AdminContextType = {
    state: StateType;
    dispatch: React.Dispatch<ActionType>;
    openCatImageModal: () => void;
    closeCatImageModal: () => void;
    isCatImageModalOpened: boolean;
    
    openProductImagesModal: () => void;
    closeProductImagesModal: () => void;
    isProductImagesModalOpened: boolean;
};

export const initialAdminContext:AdminContextType = {
    state: {
        categories: [],
        products: [],
        aboutHtmlText: "",
        cache: {
            catImageFiles: {},
        }
    },
    dispatch: () => {},
    openCatImageModal: () => {},
    closeCatImageModal: () => {},
    isCatImageModalOpened: false,
    openProductImagesModal: () => {},
    closeProductImagesModal: () => {},
    isProductImagesModalOpened: false,

}

type Props = {
    categories: CategoryType[];
    products:(ProductType|ProductGroupType)[];
    aboutHtmlText:string;
}




export const useAdminContext = ({categories, products, aboutHtmlText}:Props) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const [isCatImageModalOpened, setIsCatImageModalOpened] = useState(false);
    const [isProductImagesModalOpened, setIsProductImagesModalOpened] = useState(false);
    
    useEffect(() => {
        setCategories(categories, dispatch);
        setProducts(products, dispatch);
        setAboutHtmlText(aboutHtmlText, dispatch);
    }, [categories, products, aboutHtmlText]);
    

    /*********************************
     *  Public functions
     */
    const openCatImageModal = () => {
        setIsCatImageModalOpened(true);
    }

    const closeCatImageModal = () => {
        setIsCatImageModalOpened(false);
    }

    const openProductImagesModal = () => {
        setIsProductImagesModalOpened(true);
    }

    const closeProductImagesModal = () => {
        setIsProductImagesModalOpened(false);
    }

    return {
        state,
        dispatch,
        openCatImageModal,
        closeCatImageModal,
        isCatImageModalOpened,
        openProductImagesModal,
        closeProductImagesModal,
        isProductImagesModalOpened
    };
}

export default useAdminContext;