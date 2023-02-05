import { NextRouter, useRouter } from 'next/router';
import { CategoryType, ProductType } from '../../database';
import { useEffect, useState } from 'react';

import { getProducts } from '../../database';
import { PriceRangeType } from '../../config';



export type handlePriceChangeOption = PriceRangeType | null;


const useCategoryPage = (categories:CategoryType[], initProducts: ProductType[], selectedCategoryID: string) => {

    const router = useRouter();

    const [_products, set_Products] = useState(initProducts);
    const [_selectedCategory, set_SelectedCategory] = useState(getSelectedCategory(categories, selectedCategoryID));
    const [_currentPriceRange, set_CurrentPriceRange] = useState<handlePriceChangeOption>(null);


    useEffect(() => {
        getProducts({
            categoryID: _selectedCategory?.id || null,
            price: _currentPriceRange
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


            changeUrl(url, router, _currentPriceRange ? {
                priceMin: _currentPriceRange.min.toString(),
                priceMax: _currentPriceRange.max.toString()
                } : undefined);
        });
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_selectedCategory, _currentPriceRange]);
    

    /*************************************
     * Functions
     */
    
    const handleCategoryChange = (destCat: CategoryType|null) => set_SelectedCategory(destCat);   

    const handlePriceChange = (op:handlePriceChangeOption) =>    set_CurrentPriceRange(op);


    return {
        handleCategoryChange,
        handlePriceChange,
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