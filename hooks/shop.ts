import { useState, useEffect } from 'react';

import { getProducts, getSummaryProductsByCategoryID, ProductSummaryType } from "../database";

export const useData = (initProducts:ProductSummaryType[]) => {
    const [products, setProducts] = useState(initProducts);

    const [selectedCategoryID, setSelectedCategoryID] = useState<string|null>(null);

    useEffect(() => {

        if (selectedCategoryID) {
        setProducts(getSummaryProductsByCategoryID(selectedCategoryID));
        } else {
        setProducts(getProducts());
        }
    }, [selectedCategoryID]);

    const handleCategoryChange = (catID: string) => {
        if (catID === 'title') {
        setSelectedCategoryID(null);
        } else {
        setSelectedCategoryID(catID);
        }
    }

    return {
        products,
        handleCategoryChange
    };
}