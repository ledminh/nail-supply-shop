import { CategoryType, ProductType, ProductGroupItemType } from "../database";

/************************************
 *  These types are used for sending
 *  data to the server
 */
export type CategoryToAdd = {
    name: string,
    description: string,
    imageUrl: string
}

export type CategoryToUpdate = {
    id: string,
    name: string,
    description: string,
    imageUrl: string
}

export type CategoryRequestBody = {
    type: 'add',
    data: CategoryToAdd,
} | {
    type: 'update',
    data: CategoryToUpdate
} | {
    type: 'delete',
    data: {
        id: string
    }
};


export type ProductToAdd = {
    categoryID: string,
    name: string,
    id: string,
    shortDescription: string,
    fullDescription: string,
    price: number,
    imageUrls: string[],
}

export type ProductGroupToAdd = {
    categoryID: string,
    name: string,
    variantName: string,
    mainProduct: boolean,
    id: string,
    shortDescription: string,
    fullDescription: string,
    price: number,
    imageUrls: string[],
}[]

export type ProductToUpdate = {
    categoryID: string,
    id: string,
    name: string,
    shortDescription: string,
    fullDescription: string,
    price: number,
    imageUrls: string[],
}

export type ProductRequestBody = {
    type: 'add',
    data: ProductToAdd,
} 
| {
    type: 'update',
    data: ProductToUpdate
} 
// | {
//     type: 'delete',
//     data: {
//         id: string
//     }
// };


export type ProductGroupRequestBody = {
    type: 'add',
    data: ProductGroupToAdd,
} 
// | {
//     type: 'update',
//     data: CategoryToUpdate
// } | {
//     type: 'delete',
//     data: {
//         id: string
//     }
// };

/*********************************
 *  These types are used for
 *  local state management
 */
export type _CategoryType = CategoryType & {
    new: boolean,
    newest: boolean,
    toBeDeleted: boolean,
    isEditingImage: boolean,
}

export type _ProductType = ProductType & {
    new: boolean,
    newest: boolean,
    toBeDeleted: boolean,
    isEditingImages: boolean,
}

export type _ProductGroupType = (ProductGroupItemType & {
    new: boolean,
    newest: boolean,
    toBeDeleted: boolean,
    isEditingImages: boolean,
})[];


export type DeleteFileRequestBody = {
    type: 'cat-image' | 'prod-image',
    fileName: string,
}; 

