import { FunctionComponent, ReactNode } from "react";

import styles from './ShopSection.module.scss';

/***************************
 *  Types
 */

interface ShopSectionPropsType {
    children: ReactNode;
    type: 'MainBar' | 'SideBar' | 'MobileBar';
} 

type ShopSectionType = FunctionComponent<ShopSectionPropsType>



/***************************
 *  Main Component
 */
const ShopSection:ShopSectionType = ({children, type}) => {

    return (
        <section className={styles.wrapper + ' ' + styles[type]}>
            {children}
        </section>
    )
}

export default ShopSection;