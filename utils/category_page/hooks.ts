import { NextRouter, useRouter } from 'next/router';
import { CategoryType, ProductType } from '../../database';
import { useEffect, useState } from 'react';

import { getProducts } from '../../database';
import { PriceRangeType, itemsPerPage } from '../../config';
import { ProductGroupType, SortConfigType } from '../../database/types';



export type handlePriceChangeParam = PriceRangeType | null;
export type handleCategoryChangeParam = CategoryType | null;
export type handleSortChangeParam = SortConfigType | null;


const useCategoryPage = (categories:CategoryType[], selectedCategoryID: string|null, priceRange:{
    min: number;
    max: number;
}|null, currentSort:SortConfigType|null) => {

    const router = useRouter();

    const [_products, set_Products] = useState([] as (ProductType|ProductGroupType)[]);
    const [_selectedCategory, set_SelectedCategory] = useState(getSelectedCategory(categories, selectedCategoryID));
    const [_priceRange, set_PriceRange] = useState(priceRange);
    const [_currentSort, set_CurrentSort] = useState(currentSort);
    
    const [_currentPage, set_CurrentPage] = useState(1);
    const [total, setTotal] = useState(0);


    useEffect(() => {

        if(_products.length < _currentPage * itemsPerPage) {
            getProducts({
                categoryID: _selectedCategory?.id,
                price: _priceRange? {
                    min: _priceRange.min,
                    max: _priceRange.max
                } : undefined,
                sort: _currentSort? _currentSort : undefined,
                limit: itemsPerPage,
                offset: (_currentPage - 1) * itemsPerPage
            }).then((res) => {
                    
                    if(res[0] === 'error') {
                        throw new Error(res[1]);
                    }
    
                    const {products} = res[1];            
    
                    set_Products([..._products, ...products]);


            });

        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_currentPage]);




    useEffect(() => {
        set_CurrentPage(1);
        set_Products([]);

        getProducts({
            categoryID: _selectedCategory?.id,
            price: _priceRange? {
                min: _priceRange.min,
                max: _priceRange.max
            } : undefined,
            sort: _currentSort? _currentSort : undefined,
            limit: itemsPerPage,
            offset: (_currentPage - 1) * itemsPerPage
        }).then((res) => {

            if(res[0] === 'error') {
                throw new Error(res[1]);
            }

            const {products, total} = res[1];            

            set_Products(products);
            setTotal(total);

            let url = '/shop/category';

            let query = {};

            if(_selectedCategory) {
                url += `/${_selectedCategory.slug}`;
            }

            
        
            if(_priceRange) {
                query = {
                    ...query,
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
    }, [_selectedCategory, _priceRange, _currentSort]);
    

    /*************************************
     * Functions
     */
    
    const handleCategoryChange = (cat: handleCategoryChangeParam) => set_SelectedCategory(cat);  
    const handlePriceChange = (pR: handlePriceChangeParam) =>  set_PriceRange(pR);
    const handleSortChange = (sort:handleSortChangeParam) => set_CurrentSort(sort);

    const moreButtonOnClick = () => {
        set_CurrentPage(_currentPage + 1);
    }


    return {
        handleCategoryChange,
        handlePriceChange,
        handleSortChange,
        _priceRange,
        _products,
        _selectedCategory,
        _currentSort,
        moreButtonOnClick,
        hasMore: _products.length < total
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