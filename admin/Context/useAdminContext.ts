import { useReducer, useEffect } from 'react';

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
    
};



type Props = {
    categories: CategoryType[];
    products:(ProductType|ProductGroupType)[];
    aboutHtmlText:string;
}




export const useAdminContext = ({categories, products, aboutHtmlText}:Props) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    
    useEffect(() => {
        setCategories(categories, dispatch);
        setProducts(products, dispatch);
        setAboutHtmlText(aboutHtmlText, dispatch);
    }, [categories, products, aboutHtmlText]);
    



    return {
        state,
        dispatch
    };
}

export default useAdminContext;