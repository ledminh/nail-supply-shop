import React, { FC } from 'react';
import styles from './Section.module.scss';

interface SectionProps {
  className?: string;
  children: React.ReactNode;
}

const Section: FC<SectionProps> = ({className, children}) => (
  <div className={`${styles.Section}${className? ' ' + className : ''}`}>
    {children}
  </div>
);

export default Section;
