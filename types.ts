import { NewCategoryType } from './database/types';

// for api/delete.ts
export type DeleteFileOptions = {
    fileName: string,
    type: 'cat-image' | 'product-image', 
}



// for api/category.ts
export type CategoryRequestBody = {
    type: 'add',
    data: NewCategoryType,
}

