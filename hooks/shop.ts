import { useState } from 'react';
import { useRouter } from 'next/router';

import { CategoryType, ProductSummaryType, ResponseType } from "../database";


type useDataType = (
    categoriesResponse: ResponseType<CategoryType[]>,
    productSummariesResponse: ResponseType<ProductSummaryType[]>
    ) => 
    {
        categories: CategoryType[];
        products: ProductSummaryType[];
        handleCategoryChange: (currentCat: CategoryType | null) => void;
        selectedCategoryID: string|null;
    }    


export const useData:useDataType = (categoriesResponse, productSummariesResponse) => {
    
    const router = useRouter();

    // get props from responses, if status === 'error', nothing is done here, it is being handled in the component
    const [catStatus, categoriesResponseData] = categoriesResponse;
    const [prodStatus, productSummariesResponseData] = productSummariesResponse;

    const [products, setProducts] = useState(typeof productSummariesResponseData !== 'string' ? productSummariesResponseData : []);

    const [selectedCategoryID, setSelectedCategoryID] = useState<string|null>(null);



    const handleCategoryChange = (currentCat: CategoryType | null) => {
        if (currentCat === null) {
            setSelectedCategoryID(null);
            router.push('/shop');
        } else {
            setSelectedCategoryID(currentCat.id);
            router.push(`/shop/${currentCat.slug}`);
        }
    }

    return {
        categories: typeof categoriesResponseData !== 'string'? categoriesResponseData : [],
        products,
        handleCategoryChange,
        selectedCategoryID
    };
}