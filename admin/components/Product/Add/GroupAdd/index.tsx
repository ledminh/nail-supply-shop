import { FunctionComponent } from "react";

import styles from './GroupAdd.module.scss';

import useGroupAdd from "./useGroupAdd";

import AddForm from "../AddForm";

import CloseIconSVG from '../../../../../assets/images/close_icon.svg';

/***************************
 *  Types
 */
export type ProductGroupItemToAdd = {
    _id: string;
    groupName: string;
    mainProduct: boolean;
    variantName: string;
    serialNumber: string;
    shortDescription: string;
    fullDescription: string;
    price: number;
    files: File[];
};

export type ProductGroupToAdd = ProductGroupItemToAdd[];

interface GroupAddPropsType {
    stylesField: string;

} 

type GroupAddType = FunctionComponent<GroupAddPropsType>



/***************************
 *  Main Component
 */
const GroupAdd:GroupAddType = ({
    stylesField, 
}) => {

    const {
        categories,
        selectedCategoryID,
        onCategoryChange,
        onAddFormChange,
        isAddFormResetting,
        setIsAddFormResetting,
        onCancel,
        onAdd,
        _isAddFormDataValid,
        groupName,
        onGroupNameChange,
        productGroup,
        onMainProductChange,
        mainProductID,
        onProductClick
    } = useGroupAdd({});

    return (
        <div className={styles.wrapper}>
            <div className={stylesField}>
                <label htmlFor="category">Category</label>
                <select name="category" id="category"
                    onChange={onCategoryChange}
                    value={selectedCategoryID}
                    >
                    {categories.map((category) => (
                        <option 
                            key={category.id} 
                            value={category.id}
                            >
                                {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <GroupName 
                stylesField={stylesField}
                groupName={groupName}
                onChange={onGroupNameChange}
            />
            
            <MainProductSelection
                stylesField={stylesField}
                productGroup={productGroup}
                onChange={onMainProductChange}
                mainProductID={mainProductID}
                />
            
            <ListOfProducts 
                productGroup={productGroup}
                onProductClick={onProductClick}
            />
            
            <AddForm 
                stylesField={stylesField}
                onChange={onAddFormChange}
                isResetting={isAddFormResetting}
                setIsResetting={setIsAddFormResetting}
            />
            
            <div className={styles.buttons}>
                <button className={styles.add}
                    disabled={!_isAddFormDataValid} 
                    onClick={onAdd}
                    >
                        Add to group
                    </button>
                <button className={styles.cancel}
                    onClick={onCancel}
                    >
                        Cancel
                    </button>
            </div>
        </div>
    )
}

export default GroupAdd;



/******************************************
 *  Private Components
 */

/****************************
 * GroupName
 ****************************/

type GroupNamePropsType = {
    stylesField: string;
    groupName: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

type GroupNameType = FunctionComponent<GroupNamePropsType>;


const GroupName:GroupNameType = ({stylesField, groupName, onChange}) => {


    return (
        <div className={stylesField}>
            <label htmlFor="group-name">Group name</label>
            <input 
                type="text" 
                name="group-name"
                id="group-name" 
                value={groupName}
                onChange={onChange}
                />
        </div>
    );
}


/****************************
 * MainProductSelection
 ****************************/

type MainProductSelectionPropsType = {
    stylesField: string;
    productGroup: ProductGroupToAdd;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    mainProductID: string;
}

type MainProductSelectionType = FunctionComponent<MainProductSelectionPropsType>

const MainProductSelection:MainProductSelectionType = ({
    stylesField,
    productGroup,
    onChange,
    mainProductID
}) => {

    return (
        <div className={stylesField}>
            <label htmlFor="main-product">Main Product</label>
            <select 
                name="main-product"
                id="main-product"
                onChange={onChange}
                value={mainProductID}
                disabled={productGroup.length === 0}
                >
                {
                    productGroup.map((product) => (
                        <option 
                            key={product._id} 
                            value={product._id}
                            >
                                {product.variantName}
                        </option>
                    ))
                }
            </select>
        </div>
    )
}

/****************************
 * ListOfProducts
 ****************************/

type ListOfProductsPropsType = {
    productGroup: ProductGroupToAdd;
    onProductClick: (id: string) => void;
}

type ListOfProductsType = FunctionComponent<ListOfProductsPropsType>;

const ListOfProducts:ListOfProductsType = ({productGroup, onProductClick}) => {
    return (
        <div className={styles.listProducts}>
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
                onClick={() => console.log('delete')}
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