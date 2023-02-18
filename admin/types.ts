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

export type DeleteFileRequestBody = {
    type: 'cat-image' | 'product-image',
    fileName: string,
}