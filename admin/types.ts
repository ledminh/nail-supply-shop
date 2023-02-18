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
    type: 'edit',
    data: CategoryToUpdate
} | {
    type: 'delete',
    data: {
        id: string
    }
};

/*********************************
 *  These types are used for
 *  local state management
 */
export type _CategoryType = CategoryType & {
    new: boolean,
    newest: boolean,
    toBeDeleted: boolean,
}




export type DeleteFileRequestBody = {
    type: 'cat-image' | 'product-image',
    fileName: string,
}