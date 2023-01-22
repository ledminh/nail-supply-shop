import React, { FC } from 'react';
import styles from './AdminSubSection.module.scss';

interface AdminSubSectionProps {
  title: string;
  children: React.ReactNode;
  bold?: boolean;
  last?: boolean;
  
}

const AdminSubSection: FC<AdminSubSectionProps> = ({title, children, bold, last}) => (
    <div className={`${styles.wrapper}${bold? ' ' + styles.bold: ''}${last? ' ' + styles.last: ''}`}>
      <h4>{title}</h4>
      {children}    
    </div>
);

export default AdminSubSection;