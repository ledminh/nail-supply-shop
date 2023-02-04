import { NextRouter, useRouter } from 'next/router';
import { CategoryType, ProductType } from '../../database';
import { useState } from 'react';

import { getProducts } from '../../database';

const useCategoryPage = (categories:CategoryType[], initProducts: ProductType[], selectedCategoryID: string) => {

    const router = useRouter();

    const [_products, set_Products] = useState(initProducts);
    const [_selectedCategory, set_SelectedCategory] = useState(getSelectedCategory(categories, selectedCategoryID));

    const handleCategoryChange = (destCat: CategoryType|null) => {
        if(!destCat) {
            getProducts().then((res) => {
                if(res[0] === 'error') {
                    throw new Error(res[1]);
                }
                else {
                    set_Products(res[1]);
                    set_SelectedCategory(null);
                    changeUrl('/shop/category', router);
                }
            }); 
            
        }
        else {
            getProducts({categoryID:destCat.id}).then((res) => {
                if(res[0] === 'error') {
                    throw new Error(res[1]);
                }
                else {
                    set_Products(res[1]);
                    set_SelectedCategory(getSelectedCategory(categories, destCat.id));
                    changeUrl(`/shop/category/${destCat.slug}`, router);
                }
            }); 
            
        }
    }

    return {
        handleCategoryChange,
        _products,
        _selectedCategory
    }

}

export default useCategoryPage;


/*************************************
 * Helper functions
 */

const changeUrl = (url: string, router:NextRouter) => {
    router.push(
        {
        pathname: url
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