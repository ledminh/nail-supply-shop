import { NextRouter, useRouter } from 'next/router';
import { CategoryType, ProductType } from '../../database';
import { useEffect, useState } from 'react';

import { getProducts } from '../../database';
import { PriceRangeType } from '../../config';



export type handlePriceChangeOption = PriceRangeType | undefined;


const useCategoryPage = (categories:CategoryType[], products: ProductType[], selectedCategoryID: string, priceRange?:{
    min: number;
    max: number;
}) => {

    const router = useRouter();

    const [_products, set_Products] = useState(products);
    const [_selectedCategory, set_SelectedCategory] = useState(getSelectedCategory(categories, selectedCategoryID));
    const [_priceRange, set_PriceRange] = useState<handlePriceChangeOption>(priceRange);


    useEffect(() => {
        getProducts({
            categoryID: _selectedCategory?.id,
            price: _priceRange
        }).then((res) => {

            if(res[0] === 'error') {
                throw new Error(res[1]);
            }

            const products = res[1];            

            set_Products(products);

            let url = '/shop';

            if(_selectedCategory) {
                url += `/category/${_selectedCategory.slug}`;
            }


            changeUrl(url, router, _priceRange ? {
                priceMin: _priceRange.min.toString(),
                priceMax: _priceRange.max.toString()
                } : undefined);
        });
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_selectedCategory, _priceRange]);
    

    /*************************************
     * Functions
     */
    
    const handleCategoryChange = (destCat: CategoryType|null) => set_SelectedCategory(destCat);   

    const handlePriceChange = (op:handlePriceChangeOption) =>    set_PriceRange(op);


    return {
        handleCategoryChange,
        handlePriceChange,
        _priceRange,
        _products,
        _selectedCategory
    }

}

export default useCategoryPage;


/*************************************
 * Helper functions
 */

const changeUrl = (url: string, router:NextRouter, query?: {
    [key: string]: string | string[];
}) => {
    router.push({
        pathname: url,
        query: query
        }, 
        undefined, { shallow: true }
    );
}

const getSelectedCategory = (categories:CategoryType[], selectedCategoryID: string) => {
    if(selectedCategoryID === '') {
        return null;
    }

    const selectedCategory = categories.find((cat) => cat.id === selectedCategoryID);
    
    if(!selectedCategory) {
        throw new Error('Category not found');
    }

    return selectedCategory;
}