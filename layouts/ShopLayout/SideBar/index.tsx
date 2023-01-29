import { FunctionComponent, ReactNode } from "react";

import styles from './SideBar.module.scss';

/***************************
 *  Types
 */
interface SideBarPropsType {
    children: ReactNode;
} 

type SideBarType = FunctionComponent<SideBarPropsType>



/***************************
 *  Main Component
 */
const SideBar:SideBarType = ({children}) => {

    return (
        <section className={styles.wrapper}>
            {children}
        </section>
    )
}

export default SideBar;