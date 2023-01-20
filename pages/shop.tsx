import { FC } from 'react';
import SelectionPanel from '../components/shop_components/SelectionPanel';
import { getCategories, getSummaryProducts, ProductSummaryType, CategoryType } from '../database';

import styles from '../styles/Shop.module.scss';

import { useData } from '../hooks/shop';
import ProductList from '../components/shop_components/ProductList';
import HeroImage from '../components/shop_components/HeroImage';
import SideBar from '../components/shop_components/SideBar';

import PriceFilter from '../components/shop_components/PriceFilter';
import Sort from '../components/shop_components/Sort';


interface ShopProps {
  categories: CategoryType[];
  initProducts: ProductSummaryType[];
}

const Shop: FC<ShopProps> = ({categories, initProducts}) => {
  
  const { products, handleCategoryChange, selectedCategoryID } = useData(initProducts);

  return (
    <div className={styles.wrapper}>
      <HeroImage />
      <div className={styles.body}>
        {/* 'TopPanelMobile' is only visible on mobile devices */}
        <TopPanelMobile
            categories={categories}
            handleCategoryChange={handleCategoryChange}
          />

        {/* 'SideBar' is only visible on desktop devices */}
        <SideBar
            categories={categories}
            selectedCategoryID={selectedCategoryID}
            handleCategoryChange={handleCategoryChange}
          />
        <div className={styles.main}>
          <TopPanel />
          <ProductList products={products}/>
        </div>
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


/*************************
 * TopPanelMobile
 */

interface TopPanelMobileProps {
  categories: CategoryType[];
  handleCategoryChange: (catID: string) => void;
}

const TopPanelMobile: FC<TopPanelMobileProps> = ({categories, handleCategoryChange}) => {
  return (
    <div className={styles.topPanelMobile}>
      <SelectionPanel
        categories={categories}
        onChange={handleCategoryChange}
      />
    </div>
  )
}



/*************************
 * TopPanelDesktop
 */

interface TopPanelProps {
}

const TopPanel: FC<TopPanelProps> = () => {
  return (
    <div className={styles.topPanel}>
      <PriceFilter />
      <Sort/>
    </div>
  )
}