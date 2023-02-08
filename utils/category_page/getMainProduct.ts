import { ProductType, ProductGroupType } from '../../database';


const getMainProduct = (_product:ProductType | ProductGroupType) => {

    if(Array.isArray(_product)) {
        const mainProduct = _product.find(p => p.mainProduct);

        if(!mainProduct) {
            throw new Error('There is no main product in the product group');
        }


        return mainProduct;
    }


    return _product;

}

export default getMainProduct;