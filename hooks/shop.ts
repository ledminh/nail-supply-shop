import { useState, useEffect } from 'react';

import { CategoryType, ProductSummaryType, ResponseType, getSummaryProducts, getSummaryProductsByCategoryID } from "../database";

interface paramsType {
    
}

type useDataType = (categoriesResponse: ResponseType<CategoryType[]>,    
productSummariesResponse: ResponseType<ProductSummaryType[]>) => {
    errMessages: string[];
    categories: CategoryType[];
    products: ProductSummaryType[];
    handleCategoryChange: (catID: string) => void;
    selectedCategoryID: string|null;
}    



export const useData:useDataType = (categoriesResponse, productSummariesResponse) => {
    
    // get data from props 
    const [catStatus, categoriesResponseData] = categoriesResponse;
    const [prodStatus, productSummariesResponseData] = productSummariesResponse;


    // set state
    const [errMessages, setErrMessages] = useState<string[]>([]);

    const [products, setProducts] = useState(typeof productSummariesResponseData === 'string' ? [] : productSummariesResponseData);

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


    // handle error messages
    useEffect(() => {                
        const _errMessages:string[] = [];
        
        if (catStatus === 'error'){

            _errMessages.push(categoriesResponseData);
        }
        
        if (prodStatus === 'error'){
            _errMessages.push(productSummariesResponseData);
        }

        setErrMessages(_errMessages);
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    




    const handleCategoryChange = (catID: string) => {
        if (catID === 'CAT/ALL') {
            setSelectedCategoryID(null);
        } else {
            setSelectedCategoryID(catID);
        }
    }

    return {
        errMessages,
        categories: categoriesResponseData as CategoryType[],
        products,
        handleCategoryChange,
        selectedCategoryID
    };
}