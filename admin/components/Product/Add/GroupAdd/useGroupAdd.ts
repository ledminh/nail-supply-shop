import { ChangeEventHandler, MouseEventHandler, useContext, useEffect, useState } from "react";
import { AdminContext } from "../../../../Context";
import { getCategories } from "../../../../reducer/actions.Categories";

import { AddFormData, isAddFormDataValid } from "../AddForm";

import { ProductGroupItemToAdd, ProductGroupToAdd } from '.';
import generateRandomId from "../../../../../utils/generateRandomId";

type useGroupAddParams = {
}

const useGroupAdd = ({
    
}: useGroupAddParams) => {

    const { state } = useContext(AdminContext);
    
    const [selectedCategoryID, setSelectedCategoryID] = useState<string>('');
    const [isAddFormResetting, setIsAddFormResetting] = useState<boolean>(false);

    

    const [groupName, setGroupName] = useState<string>('');

    const [currentAddForm, setCurrentAddForm] = useState<AddFormData|null>(null);

    const [productGroup, setProductGroup] = useState<ProductGroupToAdd>([]);
    const [currentProductID, setCurrentProductID] = useState<string|null>(null);

        
    
    // set the first category as selected category when the component is mounted
    useEffect(() => {
        const categories = getCategories(state);
        if(categories.length === 0) return;

        setSelectedCategoryID(categories[0].id);

    }, []);


    // do something with the currentProductID
    useEffect(() => {
        if(!currentProductID) return;
        
        console.log(currentProductID);

    }, [currentProductID]);

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

        newProductGroup[productIndex] = {
            ...newProductGroup[productIndex],
            mainProduct: true        
        }

        setProductGroup(newProductGroup);
    }

    const onAddFormChange = (data: AddFormData) => {
        setCurrentAddForm(data);
    }

    const onCancel:MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();

        setIsAddFormResetting(true);
    }

    const onAdd:MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();


        const newProduct:ProductGroupItemToAdd = {
            _id: generateRandomId(),
            groupName: '',
            mainProduct: false,
            variantName: currentAddForm?.productName || '',
            serialNumber: currentAddForm?.serialNumber || '',
            shortDescription: currentAddForm?.shortDescription || '',
            fullDescription: currentAddForm?.fullDescription || '',
            price: currentAddForm?.price || 0,
            files: currentAddForm?.files || [],
        }

        // if there is no main product, set the first product as main product
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
            serialNumber: currentAddForm?.serialNumber || '',
            shortDescription: currentAddForm?.shortDescription || '',
            fullDescription: currentAddForm?.fullDescription || '',
            price: currentAddForm?.price || 0,
            files: currentAddForm?.files || [],
        }

        setProductGroup(newProductGroup);
        setIsAddFormResetting(true);
    }


    const onProductClick = (productID:string) => {
        setCurrentProductID(productID);
    }

    const onProductDelete = (productID:string) => {
        const newProductGroup = productGroup.filter(product => product._id !== productID);

        setProductGroup(newProductGroup);
    }

    return {
        categories: getCategories(state),
        selectedCategoryID,
        onCategoryChange,
        onAddFormChange,
        isAddFormResetting,
        setIsAddFormResetting,
        onCancel,
        onAdd,
        _isAddFormDataValid: currentAddForm? isAddFormDataValid(currentAddForm): false,
        groupName,
        onGroupNameChange,
        productGroup,
        onMainProductChange,
        mainProductID: getMainProductID(),
        onProductClick,
        currentProductID,
        onUpdate,
        onProductDelete
    }
}

export default useGroupAdd;