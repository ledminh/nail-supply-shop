import { FunctionComponent, ReactNode } from "react";

import styles from './Section.module.scss';

/***************************
 *  Types
 */

interface SectionPropsType {
    children: ReactNode;
    type: 'MainBar' | 'SideBar' | 'MobileBar';
} 

type SectionType = FunctionComponent<SectionPropsType>



/***************************
 *  Main Component
 */
const Section:SectionType = ({children, type}) => {

    return (
        <section className={styles.wrapper + ' ' + styles[type]}>
            {children}
        </section>
    )
}

export default Section;