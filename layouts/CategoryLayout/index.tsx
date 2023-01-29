import { FC, ReactNode } from 'react';
import styles from './CategoryLayout.module.scss';

import ErrorLayout from '../ErrorLayout';
import { ResponseType, CategoryType } from '../../database';


import CategorySelect from '../../components/shop_components/CategorySelect';
import CategoryList from '../../components/shop_components/CategoryMenu';

import PriceFilter from '../../components/shop_components/PriceFilter';
import Sort from '../../components/shop_components/Sort';
import Section from './Section';

interface CategoryLayoutProps {
    children: ReactNode;
    responses: ResponseType<any>[];
    categories: CategoryType[];
    selectedCategoryID: string|null;
    handleCategoryChange: (currentCat: CategoryType|null) => void;
}

const CategoryLayout: FC<CategoryLayoutProps> = ({children, responses, categories, selectedCategoryID, handleCategoryChange}) => (
  <ErrorLayout
      responses={responses}
    > 
      <div className={styles.wrapper}>
        {/* 'MobileBar' is only visible on mobile devices */}
          
          <Section type='MobileBar'>        
            <CategorySelect
                categories={categories}
                selectedCategoryID={selectedCategoryID}
                onChange={handleCategoryChange}
            />
          </Section>
        {/* 'SideBar' is only visible on desktop devices */}
        <Section type='SideBar'>
          <CategoryList
            categories={categories}
            selectedCategoryID={selectedCategoryID}
            handleCategoryChange={handleCategoryChange}
          />
        </Section>
          
        <div className={styles.main}>
            {/* 'MainBar' is visible on both desktop and mobile devices */}
            <Section type='MainBar'>
                <PriceFilter/>
                <Sort/>
            </Section>
            {children}
        </div>
      </div>
    </ErrorLayout>
);

export default CategoryLayout;
