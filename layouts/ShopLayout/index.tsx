import { FC, ReactNode } from 'react';
import styles from './ShopLayout.module.scss';

import ErrorLayout from '../ErrorLayout';
import { ResponseType, CategoryType } from '../../database';

import TopPanelMobile from '../../components/shop_components/TopPanelMobile';
import SideBar from '../../components/shop_components/SideBar';
import TopPanelFullSize from '../../components/shop_components/TopPanelFullSize';

interface ShopLayoutProps {
    children: ReactNode;
    responses: ResponseType<any>[];
    categories: CategoryType[];
    selectedCategoryID: string|null;
    handleCategoryChange: (catID: string) => void;
}

const ShopLayout: FC<ShopLayoutProps> = ({children, responses, categories, selectedCategoryID, handleCategoryChange}) => (
  <ErrorLayout
      responses={responses}
    > 
      <div className={styles.wrapper}>
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
            <TopPanelFullSize />
            {children}
        </div>
      </div>
    </ErrorLayout>
);

export default ShopLayout;
