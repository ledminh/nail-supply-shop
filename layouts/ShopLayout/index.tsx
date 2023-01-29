import { FC, ReactNode } from 'react';
import styles from './ShopLayout.module.scss';

import ErrorLayout from '../ErrorLayout';
import { ResponseType, CategoryType } from '../../database';


import SelectionPanel from '../../components/shop_components/SelectionPanel';
import CategoryList from '../../components/shop_components/CategoryList';

import MainBar from './MainBar';
import PriceFilter from '../../components/shop_components/PriceFilter';
import Sort from '../../components/shop_components/Sort';
import ShopSection from './ShopSection';

interface ShopLayoutProps {
    children: ReactNode;
    responses: ResponseType<any>[];
    categories: CategoryType[];
    selectedCategoryID: string|null;
    handleCategoryChange: (currentCat: CategoryType|null) => void;
}

const ShopLayout: FC<ShopLayoutProps> = ({children, responses, categories, selectedCategoryID, handleCategoryChange}) => (
  <ErrorLayout
      responses={responses}
    > 
      <div className={styles.wrapper}>
        {/* 'MobileBar' is only visible on mobile devices */}
          
          <ShopSection type='MobileBar'>        
            <SelectionPanel
                categories={categories}
                onChange={handleCategoryChange}
            />
          </ShopSection>
        {/* 'SideBar' is only visible on desktop devices */}
        <ShopSection type='SideBar'>
          <CategoryList
            categories={categories}
            selectedCategoryID={selectedCategoryID}
            handleCategoryChange={handleCategoryChange}
          />
        </ShopSection>
          
        <div className={styles.main}>
            {/* 'MainBar' is visible on both desktop and mobile devices */}
            <ShopSection type='MainBar'>
                <PriceFilter/>
                <Sort/>
            </ShopSection>
            {children}
        </div>
      </div>
    </ErrorLayout>
);

export default ShopLayout;
