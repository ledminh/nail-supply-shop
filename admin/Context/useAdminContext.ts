import { useReducer, useEffect } from 'react';

import { CategoryType, ProductGroupType, ProductType } from '../../database';

import reducer, {initialState} from '../reducer';


export type AdminContextType = {
    
    
} | null;



type Props = {
    categories: CategoryType[];
    products:(ProductType|ProductGroupType)[];
    aboutHtmlText:string;
}




export const useAdminContext = ({categories, products, aboutHtmlText}:Props) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    
    useEffect(() => {
        setCategories(categories);
        setProducts(products);
        setAboutHtmlText(aboutHtmlText);
    }, [categories, products, aboutHtmlText]);
    
    
    const setCategories = (categories:CategoryType[]) => {
        dispatch({
            type: 'SET_CATEGORIES',
            payload: categories
        });
    }

    const setProducts = (products:(ProductType|ProductGroupType)[]) => {
        dispatch({
            type: 'SET_PRODUCTS',
            payload: products
        });
    }

    const setAboutHtmlText = (aboutHtmlText:string) => {
        dispatch({
            type: 'SET_ABOUT_HTML_TEXT',
            payload: aboutHtmlText
        });
    }




    return {
        state,
        dispatch
    };
}

export default useAdminContext;