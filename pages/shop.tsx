import { FC } from 'react';
import SelectionPanel from '../components/shop_components/SelectionPanel';
import { getCategories, getSummaryProducts, ProductSummaryType, CategoryType } from '../database';

import styles from '../styles/Shop.module.scss';

import { useData } from '../hooks/shop';
import ProductList from '../components/shop_components/ProductList';


interface ShopProps {
  categories: CategoryType[];
  initProducts: ProductSummaryType[];
}

const Shop: FC<ShopProps> = ({categories, initProducts}) => {
  
  const { products, handleCategoryChange } = useData(initProducts);

  return (
    <div className={styles.wrapper}>
      <h2>Products</h2>

      <SelectionPanel
        categories={categories}
        onChange={handleCategoryChange}
      />

      <div className={styles.products}>
        <ProductList products={products}/>
      </div>
    </div>
  )
};

export default Shop;

export const getServerSideProps = async () => {
  // Fetch data from API
  
  
  return {
    props: {
      categories: getCategories(),
      initProducts: getSummaryProducts(),
    }
  }
}
