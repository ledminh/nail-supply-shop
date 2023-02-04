import React, { FC } from 'react';
import styles from './Section.module.scss';

interface SectionProps {
  className?: string;
  title: string;
  children: React.ReactNode;
}

const Section: FC<SectionProps> = ({className, title, children}) => (
  <div className={`${styles.Section}${className? ' ' + className : ''}`}>
    <h3 className={styles.title}>{title}</h3>
    {children}
  </div>
);

export default Section;
