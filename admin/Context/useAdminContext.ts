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
    
};



type Props = {
    categories: CategoryType[];
    products:(ProductType|ProductGroupType)[];
    aboutHtmlText:string;
}




export const useAdminContext = ({categories, products, aboutHtmlText}:Props) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const [isCatImageModalOpen, setIsCatImageModalOpen] = useState(false);
    
    useEffect(() => {
        setCategories(categories, dispatch);
        setProducts(products, dispatch);
        setAboutHtmlText(aboutHtmlText, dispatch);
    }, [categories, products, aboutHtmlText]);
    

    /*********************************
     *  Public functions
     */
    const openCatImageModal = () => {
        setIsCatImageModalOpen(true);
    }

    return {
        state,
        dispatch,
        openCatImageModal,
    };
}

export default useAdminContext;