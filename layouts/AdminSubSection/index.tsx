import React, { FC } from 'react';
import styles from './AdminSubSection.module.scss';

interface AdminSubSectionProps {
  title: string;
  children: React.ReactNode;
  bold?: boolean;
  last?: boolean;
  collapsable?: boolean;
  
}

const AdminSubSection: FC<AdminSubSectionProps> = ({title, children, bold, last, collapsable}) => {
  
  const [collapsed, setCollapsed] = React.useState<boolean>(false);

  const toggleCollapsed = () => {

    setCollapsed(!collapsed);
  }

  return (
    <div className={`${styles.wrapper}${collapsable? ' ' + styles.collapsable: ''}${collapsed? ' ' + styles.collapsed : ''}${bold? ' ' + styles.bold: ''}${last? ' ' + styles.last: ''}`}>
      <div className={styles.title} onClick={toggleCollapsed}>
        <h4>{title}</h4>
      </div>
      <div className={styles.content}>
        {children}    
      </div>
    </div>
  );
} 

export default AdminSubSection;