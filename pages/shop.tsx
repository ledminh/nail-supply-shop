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

import ErrorLayout from '../layouts/ErrorLayout';
import { NextPageCustomized } from './_app';


interface ShopProps {
  categoriesResponse: ResponseType<CategoryType[]>;
  productSummariesResponse: ResponseType<ProductSummaryType[]>;
}

const Shop: NextPageCustomized<ShopProps> = ({categoriesResponse, productSummariesResponse}) => {
  const { errResponses, categories, products, handleCategoryChange, selectedCategoryID } = useData(categoriesResponse, productSummariesResponse);
  

  return (
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
  )
};

export default Shop;


/****************************
 * Customized page
 */
Shop.getLayout = (page: ReactNode) => {
  return (
    <div className={styles.wrapper}>
      <HeroImage />
      {page}
    </div>
  )
}



/********************
 * SERVER SIDE PROPS
 */
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









/*******************************************************************
 * OTHER COMPONENTS
 *******************************************************************/


// TopPanelMobile

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



// TopPanelDesktop

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