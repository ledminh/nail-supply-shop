import data from './data';

export const getSummaryProducts = () => {
    const summaryProducts = data.map((product) => {
        const { id, name, shortDescription, imageUrl } = product;
        return {
            id,
            name,
            description: shortDescription,
            imageUrl,
        };

    });
    return summaryProducts;
};

export const getProducts = () => {
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



export const getProductById = (id: number) => {
    const product = data.find((product) => product.id === id);

    if (!product) {
        throw new Error('Product not found');
    }

    return product;
};


