import { FunctionComponent } from "react";

import { ProductGroupToAdd, ProductGroupItemToAdd } from "..";

import CloseIconSVG from '../../../../../../assets/images/close_icon.svg';

import styles from './ListOfProducts.module.scss';




/***************************
 *  Types
 */
type ListOfProductsPropsType = {
    productGroup: ProductGroupToAdd;
    onProductClick: (id: string) => void;
}

type ListOfProductsType = FunctionComponent<ListOfProductsPropsType>;

/*****************************
 * Main Component
 */

const ListOfProducts:ListOfProductsType = ({productGroup, onProductClick}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>List of products:</div>
            <div className={styles.body}>
                {
                    productGroup.map((product) => (
                        <Product 
                            key={product._id}
                            product={product} 
                            onProductClick={onProductClick}
                            />
                    ))
                }
            </div>
        </div>
    )
}

export default ListOfProducts;

// ***********************
// Product
// ***********************
type ProductPropsType = {
    product: ProductGroupItemToAdd;
    onProductClick: (id: string) => void;
}

type ProductType = FunctionComponent<ProductPropsType>;

const Product:ProductType = ({product, onProductClick}) => {

    return (
        <div className={styles.product + (product.mainProduct? ' ' + styles.mainProduct: '')}
            onClick={() => onProductClick(product._id)}
        >
            <span className={styles.name}>{product.variantName}</span>
            <button className={styles.delete}
                onClick={(e) => {
                    e.preventDefault();
                    console.log('delete');
                }}
            >
                <CloseIconSVG
                    className={styles.icon}
                    viewBox="0 0 18 18"
                    height="10"
                    width="10"
                />
            </button>
        </div>
    )
}


