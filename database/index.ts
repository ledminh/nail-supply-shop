import data from './data';

export type ProductType = {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
};



export const getSummaryProducts = ():ProductType[] => {
    const summaryProducts = data.map((product) => {
        const { id, name, shortDescription, price, imageUrl } = product;
        return {
            id,
            name,
            price,
            description: shortDescription,
            imageUrl,
        };

    });

    return summaryProducts;
};

export const getProducts = ():ProductType[] => {
    return data.map((product) => {
        const { id, name, fullDescription, price, imageUrl } = product;
        return {
            id,
            name,
            price,
            description: fullDescription,
            imageUrl,
        };
    });
};



export const getProductById = (id: string):ProductType => {
    const product = data.find((product) => product.id === id);

    if (!product) {
        throw new Error('Product not found');
    }

    return {
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.fullDescription,
        imageUrl: product.imageUrl,
    };
};


