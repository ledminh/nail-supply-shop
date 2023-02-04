import { FC, ReactNode } from 'react';
import styles from './CategoryLayout.module.scss';

import { CategoryType } from '../../database';


import CategorySelect from '../../components/category_components/CategorySelect';
import CategoryMenu from '../../components/category_components/CategoryMenu';

import PriceFilter from '../../components/category_components/PriceFilter';
import Sort from '../../components/category_components/Sort';
import Section from './Section';

interface CategoryLayoutProps {
    children: ReactNode;
    categories: CategoryType[];
    selectedCategoryID: string|null;
    handleCategoryChange: (destCat: CategoryType|null) => void;
}

const CategoryLayout: FC<CategoryLayoutProps> = ({children, categories, selectedCategoryID, handleCategoryChange}) => {

  


  return (
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
        <CategoryMenu
          categories={categories}
          selectedCategoryID={selectedCategoryID}
          onChange={handleCategoryChange}
          />
      </Section>
        
      <div className={styles.main}>
          <Section type='IntroBar'>
            
          </Section>
          {/* 'MainBar' is visible on both desktop and mobile devices */}
          <Section type='MainBar'>
              <div className={styles.subSection}>
                <PriceFilter/>
              </div>
              <div className={styles.subSection}>
                <Sort/>
              </div>
          </Section>
          {children}
      </div>
    </div>
  )
} 
  


export default CategoryLayout;
