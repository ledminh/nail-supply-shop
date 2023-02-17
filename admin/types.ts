export type NewCategoryType = {
    name: string,
    description: string,
    imageUrl: string
}

export type CategoryToUpdateType = {
    id: string,
    name: string,
    description: string,
    imageUrl: string
}

export type CategoryRequestBody = {
    type: 'add',
    data: NewCategoryType,
} | {
    type: 'edit',
    data: CategoryToUpdateType
} | {
    type: 'delete',
    data: {
        id: string
    }
};