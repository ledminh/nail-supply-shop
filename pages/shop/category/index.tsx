import { NextPageCustomized } from '../../_app';


import { pageConfigs } from '../../../config';
import styles from '../../../styles/Category.module.scss'


import CategoryLayout from '../../../layouts/CategoryLayout';

import { CategoryPageDataType, getCategoryPageData } from '../../../database';

import ListLayout from '../../../layouts/ListLayout';
import ProductItem from '../../../components/category_components/ProductItem';

import useCategoryPage from '../../../utils/category_page/hooks';

type CategoryIndexProps = CategoryPageDataType;

type CategoryIndexPageType = NextPageCustomized<CategoryIndexProps>;




const CategoryIndexPage:CategoryIndexPageType = ({categories, products}) => {
    
    const {handleCategoryChange, _products, _selectedCategory} = useCategoryPage(categories, products, '');

    return (
        <CategoryLayout 
            categories={categories}
            selectedCategoryID={null}
            handleCategoryChange={handleCategoryChange}
            >
                <ListLayout
                    wrapperClassName={styles.ul}
                    liClassName={styles.li}
                    renderItemBody={(_product) => <ProductItem product={_product}/>}
                    keyExtractor={(_product) => _product.id}
                    data={_products.map((_product) => ({
                        ..._product,
                        url: `/product/${_product.id}`,
                        }))}
                    />
        </CategoryLayout>
    );
}


export default CategoryIndexPage;


CategoryIndexPage.pageConfig = pageConfigs.category;


export const getServerSideProps = async () => {
    
    const response = await getCategoryPageData();
    
    return {
        props: {
            response
        },
    };

}