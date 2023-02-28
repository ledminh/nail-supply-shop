import { ChangeEventHandler, MouseEventHandler, useContext, useEffect, useState } from "react";
import { AdminContext } from "../../../../Context";
import { getCategories } from "../../../../reducer/actions.Categories";

import { AddFormData, isAddFormDataValid } from "../AddForm";

import { ProductItem, GroupAddData } from '.';
import generateRandomId from "../../../../../utils/generateRandomId";

type useGroupAddParams = {
    setIsDataValid: (isDataValid: boolean) => void;
    isResetting: boolean;
    setIsResetting: (isResetting: boolean) => void;
    onGroupAddDataChange: (groupAddData: GroupAddData) => void;
}

const useGroupAdd = ({
    setIsDataValid,
    isResetting,
    setIsResetting,
    onGroupAddDataChange
}: useGroupAddParams) => {

    const { state } = useContext(AdminContext);
    
    const [selectedCategoryID, setSelectedCategoryID] = useState<string>('');
    const [isAddFormResetting, setIsAddFormResetting] = useState<boolean>(false);

    

    const [groupName, setGroupName] = useState<string>('');

    const [currentAddForm, setCurrentAddForm] = useState<AddFormData|null>(null);

    const [productGroup, setProductGroup] = useState<ProductItem[]>([]);
    const [currentProductID, setCurrentProductID] = useState<string|null>(null);

    const [addFormFeedingData, setAddFormFeedingData] = useState<AddFormData|null>(null);
    
    // set the first category as selected category when the component is mounted
    useEffect(() => {
        const categories = getCategories(state);
        if(categories.length === 0) return;

        setSelectedCategoryID(categories[0].id);

    }, []);


    // do something with the currentProductID
    useEffect(() => {
        if(!currentProductID) {
            return;
        }
        
        const product = productGroup.find(product => product._id === currentProductID);

        if(!product) return;

        setAddFormFeedingData({
            productName: product.variantName,
            id: product.id,
            shortDescription: product.shortDescription,
            fullDescription: product.fullDescription,
            price: product.price,
            files: product.files
        });

    }, [currentProductID]);

    // set the isDataValid state, thus enable/disable the add button. Data is valid when there is at least one product in the product group, and the group name is not empty
    useEffect(() => {
        if(productGroup.length === 0 || groupName === '' || selectedCategoryID === '') {
            setIsDataValid(false);
            return;
        }
        else {
            setIsDataValid(true);
        }


    }, [productGroup, groupName]);

    useEffect(() => {
        const groupAddData:GroupAddData = {
            groupName,
            categoryID: selectedCategoryID,
            products: productGroup
        };

        onGroupAddDataChange(groupAddData);
    }, [productGroup, groupName, selectedCategoryID]);


    // reset all states when isResetting is true (when the user clicks the add or cancel button)
    useEffect(() => {
        if(isResetting) {
            setGroupName('');
            setProductGroup([]);
            setCurrentProductID(null);

            setIsAddFormResetting(true);

            setIsResetting(false);
        }
    }, [isResetting]);

    const getMainProductID = () => {
        const mainProduct = productGroup.find(product => product.mainProduct === true);

        if(!mainProduct) return '';

        return mainProduct._id;
    }

    /*************************************
     *  Public methods
     */

    const onCategoryChange:ChangeEventHandler<HTMLSelectElement> = (e) => {
        e.preventDefault();

        setSelectedCategoryID(e.target.value);

    }

    const onGroupNameChange:ChangeEventHandler<HTMLInputElement> = (e) => {
        e.preventDefault();

        setGroupName(e.target.value);
    }

    // reset all products's mainProduct to false and set the selected product's mainProduct to true
    const onMainProductChange:ChangeEventHandler<HTMLSelectElement> = (e) => {
        e.preventDefault();

        const newProductGroup  = productGroup.map(product => {
            return {
                ...product,
                mainProduct: false
                }
        });

        const productID = e.target.value;

        const productIndex = newProductGroup.findIndex(product => product._id === productID);

        newProductGroup[productIndex].mainProduct = true; 

        setProductGroup(newProductGroup);
    }

    const onAddFormChange = (data: AddFormData) => {
        setCurrentAddForm(data);
    }

    const onClear:MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();

        setIsAddFormResetting(true);
    }

    const onAdd:MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();


        const newProduct:ProductItem = {
            _id: generateRandomId(),
            groupName: '',
            mainProduct: false,
            variantName: currentAddForm?.productName || '',
            id: currentAddForm?.id || '',
            shortDescription: currentAddForm?.shortDescription || '',
            fullDescription: currentAddForm?.fullDescription || '',
            price: currentAddForm?.price || 0,
            files: currentAddForm?.files || [],
        }

        
        if(productGroup.length === 0) {
            newProduct.mainProduct = true;
        }

        const newProductGroup = [...productGroup, newProduct];

        setProductGroup(newProductGroup);
        setIsAddFormResetting(true);
    }

    const onUpdate:MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();

        if(!currentProductID) return;

        const productIndex = productGroup.findIndex(product => product._id === currentProductID);

        const newProductGroup = [...productGroup];

        newProductGroup[productIndex] = {
            ...newProductGroup[productIndex],
            variantName: currentAddForm?.productName || '',
            id: currentAddForm?.id || '',
            shortDescription: currentAddForm?.shortDescription || '',
            fullDescription: currentAddForm?.fullDescription || '',
            price: currentAddForm?.price || 0,
            files: currentAddForm?.files || [],
        }

        setProductGroup(newProductGroup);
        setIsAddFormResetting(true);
        setCurrentProductID(null);
    }

    const onCreateNewProduct:MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();

        setCurrentProductID(null);
        setIsAddFormResetting(true);
    }


    const onProductClick = (productID:string) => {
        setCurrentProductID(productID);
    }

    const onProductDelete = (productID:string) => {
        const toBeDeletedProduct = productGroup.find(product => product._id === productID);

        if(!toBeDeletedProduct) return;

        let newProductGroup = productGroup.filter(product => product._id !== productID);

        if(toBeDeletedProduct.mainProduct && newProductGroup.length > 0) {
            newProductGroup[0].mainProduct = true;
        }

        
        if(currentProductID === productID) {
            setCurrentProductID(null);
            setIsAddFormResetting(true);
        }


        setProductGroup(newProductGroup);
    }

    return {
        categories: getCategories(state),
        selectedCategoryID,
        onCategoryChange,
        onAddFormChange,
        isAddFormResetting,
        setIsAddFormResetting,
        onClear,
        onAdd,
        onUpdate,
        _isAddFormDataValid: currentAddForm? isAddFormDataValid(currentAddForm): false,
        groupName,
        onGroupNameChange,
        productGroup,
        onMainProductChange,
        mainProductID: getMainProductID(),
        onProductClick,
        currentProductID,
        onCreateNewProduct,
        onProductDelete,
        addFormFeedingData,
        setAddFormFeedingData
    }
}

export default useGroupAdd;