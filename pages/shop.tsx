import { FC } from 'react';
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


interface ShopProps {
  categoriesResponse: ResponseType<CategoryType[]>;
  productSummariesResponse: ResponseType<ProductSummaryType[]>;
}

const Shop: FC<ShopProps> = ({categoriesResponse, productSummariesResponse}) => {
  
  const { errMessages, categories, products, handleCategoryChange, selectedCategoryID } = useData(categoriesResponse, productSummariesResponse);

  if(errMessages.length > 0) {
    return (
      <ErrorScreen
        errMessages={errMessages}
      />
    )
  }

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