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
    onProductDelete: (id: string) => void;
    currentProductID: string|null;
}

type ListOfProductsType = FunctionComponent<ListOfProductsPropsType>;

/*****************************
 * Main Component
 */

const ListOfProducts:ListOfProductsType = ({productGroup, onProductClick, onProductDelete, currentProductID}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>List of products:</div>
            <div className={styles.body}>
                {
                    productGroup.map((product) => (
                        <Product 
                            key={product._id}
                            product={product}
                            current={product._id === currentProductID} 
                            onProductClick={onProductClick}
                            onProductDelete={onProductDelete}
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
    onProductDelete: (id: string) => void;
    current: boolean;
}

type ProductType = FunctionComponent<ProductPropsType>;

const Product:ProductType = ({product, onProductClick, onProductDelete, current}) => {

    return (
        <div className={styles.product + (product.mainProduct? ' ' + styles.mainProduct: '') + (current? ' ' + styles.current: '')}
            onClick={() => onProductClick(product._id)}
        >
            <span className={styles.name}>{product.variantName}</span>
            <button className={styles.delete}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onProductDelete(product._id);
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


