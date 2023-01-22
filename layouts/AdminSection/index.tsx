import React, { FC } from 'react';
import styles from './AdminSection.module.scss';

interface AdminSectionProps {
  title: string;
  children: React.ReactNode;
}

const AdminSection: FC<AdminSectionProps> = ({title, children}) => (
  <div className={styles.wrapper}>
      <h3 className={styles.title}>{title}</h3>
      {children}
  </div>
);

export default AdminSection;
