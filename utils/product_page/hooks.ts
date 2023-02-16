import { useEffect, useState } from 'react';

import { ProductGroupType, ProductType } from '../../database/types';


const useProduct = (product:ProductType|ProductGroupType) => {
    const [_product, set_Product] = useState<ProductType|ProductType&{
        mainProduct?: boolean;
        variantName: string;
    }>(Array.isArray(product)? product[product.findIndex(p => p.mainProduct)] : product);

    const [currentVariantName, setCurrentVariantName] = useState<string|null>(null);

    useEffect(() => {
        if (Array.isArray(product)) {
            const mainProduct = product[product.findIndex(p => p.mainProduct)];
            set_Product(mainProduct);
        }
    }, [product]);

    
    useEffect(()=>{
        if (Array.isArray(product)) {
            const variantName = product.find(p => p.id === _product.id)?.variantName;
            if (variantName) {
                setCurrentVariantName(variantName);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_product]);


    /***********************************
     * public methods
     */

    const variationOnChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        if(!Array.isArray(product)) return;

        const selectedProduct = product.find(p => p.id === e.target.value);

        if (selectedProduct) {
            set_Product(selectedProduct);
        }
    };

    return {
        _product,
        currentVariantName,
        variationOnChange
    };
};

export default useProduct;