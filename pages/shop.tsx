import { FC, ReactNode } from 'react';
import SelectionPanel from '../components/shop_components/SelectionPanel';
import { getCategories, getSummaryProducts, ProductSummaryType, CategoryType, ResponseType } from '../database';

import styles from '../styles/Shop.module.scss';

import { useData } from '../hooks/shop';
import ProductList from '../components/shop_components/ProductList';
import HeroImage from '../components/shop_components/HeroImage';
import SideBar from '../components/shop_components/SideBar';

import PriceFilter from '../components/shop_components/PriceFilter';
import Sort from '../components/shop_components/Sort';

import ErrorScreen from '../components/ErrorScreen';
import getErrMessages from '../utils/getErrMessages';
import ErrorLayout from '../layouts/ErrorLayout/ErrorLayout';


interface ShopProps {
  categoriesResponse: ResponseType<CategoryType[]>;
  productSummariesResponse: ResponseType<ProductSummaryType[]>;
}

const Shop: FC<ShopProps> = ({categoriesResponse, productSummariesResponse}) => {
  const { errResponses, categories, products, handleCategoryChange, selectedCategoryID } = useData(categoriesResponse, productSummariesResponse);
  

  return (
    <div className={styles.wrapper}>
      <HeroImage />
      <ErrorLayout
        responses={[categoriesResponse, productSummariesResponse, ...errResponses]}
      >
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
      </ErrorLayout>
    </div>
  )
};

export default Shop;

export const getServerSideProps = async () => {
  const categoriesResponse = await getCategories();
  const productSummariesResponse = await getSummaryProducts();  
  
  
  return {
    props: {
      categoriesResponse,
      productSummariesResponse,
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