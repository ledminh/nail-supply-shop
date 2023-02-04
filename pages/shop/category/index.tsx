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
    
    const {handleCategoryChange} = useCategoryPage();

    return (
        <CategoryLayout 
            categories={categories}
            selectedCategoryID={null}
            handleCategoryChange={handleCategoryChange}
            >
                <ListLayout
                    wrapperClassName={styles.ul}
                    liClassName={styles.li}
                    renderItemBody={(product) => <ProductItem product={product}/>}
                    keyExtractor={(product) => product.id}
                    data={products.map((product) => ({
                        ...product,
                        url: `/product/${product.id}`,
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