import { useState, useEffect } from 'react';

import { CategoryType, ProductSummaryType, ResponseType, getSummaryProducts, getSummaryProductsByCategoryID } from "../database";

type useDataType = (categoriesResponse: ResponseType<CategoryType[]>,    
productSummariesResponse: ResponseType<ProductSummaryType[]>) => {
    errResponses: ResponseType<any>[];
    categories: CategoryType[];
    products: ProductSummaryType[];
    handleCategoryChange: (catID: string) => void;
    selectedCategoryID: string|null;
}    


// TODO: this useData is for shop/index.tsx, it uses fetches from database. Refactor this to use getServersideProps totally

export const useData:useDataType = (categoriesResponse, productSummariesResponse) => {
    
    // get props from responses, if status === 'error', nothing is done here, it is being handled in the component
    const [catStatus, categoriesResponseData] = categoriesResponse;
    const [prodStatus, productSummariesResponseData] = productSummariesResponse;


    // error messages for category change, it will be added to the errResponses on ErrorLayout component
    const [errMessages, setErrMessages] = useState<string[]>([]);


    /***************************************************
     * Change list of products when category is changed
     */ 
    const [products, setProducts] = useState(productSummariesResponseData as ProductSummaryType[]);

    const [selectedCategoryID, setSelectedCategoryID] = useState<string|null>(null);



        // handle category change
    useEffect(() => {
        async function run() {
            if (selectedCategoryID) {
                const [status, productsData] = await getSummaryProductsByCategoryID(selectedCategoryID);
    
                if (status === 'error') {
                    setErrMessages([productsData]);
                }
                else {
                    setProducts(productsData);
                }

                
            } else {
                const [status, productsData] = await getSummaryProducts();

                if (status === 'error') {
                    setErrMessages([productsData]);
                }
                else {
                    setProducts(productsData);
                }
            }
        }

        run();


    }, [selectedCategoryID]);
    




    const handleCategoryChange = (catID: string) => {
        if (catID === 'CAT/ALL') {
            setSelectedCategoryID(null);
        } else {
            setSelectedCategoryID(catID);
        }
    }

    return {
        errResponses: errMessages.map(errMessage => ['error', errMessage]),
        categories: categoriesResponseData as CategoryType[],
        products,
        handleCategoryChange,
        selectedCategoryID
    };
}