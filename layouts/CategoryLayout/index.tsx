import { FC, ReactNode } from 'react';
import styles from './CategoryLayout.module.scss';

import { CategoryType } from '../../database';

import Image from 'next/image';

import CategorySelect from '../../components/category_components/CategorySelect';
import CategoryMenu from '../../components/category_components/CategoryMenu';

import PriceFilter from '../../components/category_components/PriceFilter';
import Sort from '../../components/category_components/Sort';
import Section from './Section';
import { PriceRangeType } from '../../config';
import { SortConfigType } from '../../database/types';
import { handlePriceChangeParam } from '../../utils/category_page/hooks';

interface CategoryLayoutProps {
    children: ReactNode;
    categories: CategoryType[];
    selectedCategory: CategoryType|null;
    handleCategoryChange: (destCat: CategoryType|null) => void;
    handlePriceChange: (priceRange:handlePriceChangeParam) => void;
    currentPriceRange: PriceRangeType|null;
    handleSortChange: handleSortChangeType;
    currentSort: SortConfigType

}

const CategoryLayout: FC<CategoryLayoutProps> = ({children, categories, selectedCategory, handlePriceChange, handleCategoryChange, currentPriceRange, handleSortChange, currentSort}) => {

  


  return (
    <div className={styles.wrapper}>
      {/* 'MobileBar' is only visible on mobile devices */}
        
        <Section type='MobileBar'>        
          <CategorySelect
              categories={categories}
              selectedCategoryID={selectedCategory? selectedCategory.id: null}
              onChange={handleCategoryChange}
          />
        </Section>
      {/* 'SideBar' is only visible on desktop devices */}
      <Section type='SideBar'>
        <CategoryMenu
          categories={categories}
          selectedCategoryID={selectedCategory? selectedCategory.id: null}
          onChange={handleCategoryChange}
          />
      </Section>
        
      <div className={styles.main}>
          {
              selectedCategory && (
                <Section type='IntroBar'>
                  <Image
                    src={selectedCategory.imageUrl}
                    alt={selectedCategory.name}
                    fill
                    style={{
                      objectFit: 'cover',
                    }}
                    />
                    <div className={styles.introBar}>
                      <h4 className={styles.name}>{selectedCategory.name}</h4>
                      <p className={styles.description}>{selectedCategory.description}</p>
                    </div>
                </Section>
              )
          }

          {/* 'MainBar' is visible on both desktop and mobile devices */}
          <Section type='MainBar'>
              <div className={styles.subSection}>
                <PriceFilter 
                  handlePriceChange={handlePriceChange}
                  currentPriceRange={currentPriceRange}
                  />
              </div>
              <div className={styles.subSection}>
                <Sort
                  handleSortChange={handleSortChange}
                  currentSort={currentSort}
                />
              </div>
          </Section>
          {children}
      </div>
    </div>
  )
} 
  


export default CategoryLayout;
