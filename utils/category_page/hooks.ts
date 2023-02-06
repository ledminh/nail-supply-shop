import { NextRouter, useRouter } from 'next/router';
import { CategoryType, ProductType } from '../../database';
import { useEffect, useState } from 'react';

import { getProducts } from '../../database';
import { PriceRangeType } from '../../config';
import { SortConfigType } from '../../database/types';



export type handlePriceChangeParam = PriceRangeType | null;
export type handleCategoryChangeParam = CategoryType | null;
export type handleSortChangeParam = SortConfigType;


const useCategoryPage = (categories:CategoryType[], products: ProductType[], selectedCategoryID: string|null, priceRange:{
    min: number;
    max: number;
}|null, currentSort:SortConfigType|null) => {

    const router = useRouter();

    const [_products, set_Products] = useState(products);
    const [_selectedCategory, set_SelectedCategory] = useState(getSelectedCategory(categories, selectedCategoryID));
    const [_priceRange, set_PriceRange] = useState(priceRange);
    const [_currentSort, set_CurrentSort] = useState(currentSort);


    useEffect(() => {

        getProducts({
            categoryID: _selectedCategory?.id,
            price: _priceRange? {
                min: _priceRange.min,
                max: _priceRange.max
            } : undefined,
            sort: _currentSort? _currentSort : undefined
        }).then((res) => {

            if(res[0] === 'error') {
                throw new Error(res[1]);
            }

            const products = res[1];            

            set_Products(products);

            let url = '/shop/category';

            let query;

            if(_selectedCategory) {
                url += `/${_selectedCategory.slug}`;
            }

            
        
            if(_priceRange) {
                query = {
                    priceMin: _priceRange.min.toString(),
                    priceMax: _priceRange.max.toString()
                }
            }

            if(_currentSort) {
                query = {
                    ...query,
                    sortType: _currentSort.type,
                    sortOrder: _currentSort.order
                }
            }

            
            changeUrl(url, router, query);

            
        });
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_selectedCategory, _priceRange]);
    

    /*************************************
     * Functions
     */
    
    const handleCategoryChange = (cat: handleCategoryChangeParam) => set_SelectedCategory(cat);  
    const handlePriceChange = (pR: handlePriceChangeParam) =>  set_PriceRange(pR);
    const handleSortChange = (sort:handleSortChangeParam) => set_CurrentSort(sort);


    return {
        handleCategoryChange,
        handlePriceChange,
        handleSortChange,
        _priceRange,
        _products,
        _selectedCategory,
        _currentSort
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

const getSelectedCategory = (categories:CategoryType[], selectedCategoryID: string|null) => {
    if(selectedCategoryID === null) {
        return null;
    }

    const selectedCategory = categories.find((cat) => cat.id === selectedCategoryID);
    
    if(!selectedCategory) {
        throw new Error('Category not found');
    }

    return selectedCategory;
}