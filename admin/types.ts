import { CategoryType } from "../database";

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

// TODO: serial number here and ID in database

export type ProductToAdd = {
    categoryID: string,
    name: string,
    serialNumber: string,
    shortDescription: string,
    fullDescription: string,
    price: number,
    imageUrls: string[],
}

export type ProductRequestBody = {
    type: 'add',
    data: ProductToAdd,
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




export type DeleteFileRequestBody = {
    type: 'cat-image' | 'product-image',
    fileName: string,
}