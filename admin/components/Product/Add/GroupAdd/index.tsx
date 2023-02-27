import { FunctionComponent } from "react";

import styles from './GroupAdd.module.scss';

import useGroupAdd from "./useGroupAdd";

import AddForm from "../AddForm";



import GroupName from "./GroupName";
import MainProductSelection from "./MainProductSelection";
import ListOfProducts from "./ListOfProducts";
import CategoryList from "../CategoryList";


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
        onClear,
        onAdd,
        onUpdate,
        _isAddFormDataValid,
        groupName,
        onGroupNameChange,
        productGroup,
        onMainProductChange,
        mainProductID,
        onProductClick,
        onProductDelete,
        currentProductID,
        onCreateNewProduct,
        addFormFeedingData,
        setAddFormFeedingData
    } = useGroupAdd({});

    return (
        <div className={styles.wrapper}>
            <CategoryList
                stylesField={stylesField}
                onCategoryChange={onCategoryChange}
                selectedCategoryID={selectedCategoryID}
                categories={categories}
            />

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

            {
                productGroup.length === 0 && (
                    <div className={styles.noProduct}>
                        <span>No product in group</span>
                    </div>
                )
            }

            {
                productGroup.length > 0 && (
                    <ListOfProducts 
                        productGroup={productGroup}
                        onProductClick={onProductClick}
                        onProductDelete={onProductDelete}
                        currentProductID={currentProductID}
                    />
                )
            }
            
            <AddForm 
                stylesField={stylesField}
                onChange={onAddFormChange}
                isResetting={isAddFormResetting}
                setIsResetting={setIsAddFormResetting}
                feedingData={addFormFeedingData}
                setFeedingData={setAddFormFeedingData}
            />
            
            <div className={styles.buttons}>
                {
                    currentProductID === null ? (
                        <button className={styles.add}
                            disabled={!_isAddFormDataValid} 
                            onClick={onAdd}
                            >
                                Add to group
                        </button>
                    ) :(
                        <>
                            <button className={styles.createNewProduct}
                                onClick={onCreateNewProduct}
                                >
                                    Create new 
                            </button>
                            <button className={styles.updateProduct}
                                disabled={!_isAddFormDataValid}
                                onClick={onUpdate}
                                >
                                    Update
                            </button>
                        </>
                    )                        
                }
                <button className={styles.clear}
                    onClick={onClear}
                    >
                        Clear
                    </button>
            </div>
        </div>
    )
}

export default GroupAdd;