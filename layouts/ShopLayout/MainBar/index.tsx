import { FunctionComponent, ReactNode } from "react";

import styles from './MainBar.module.scss';

/***************************
 *  Types
 */
interface MainBarPropsType {
    children: ReactNode;
} 

type MainBarType = FunctionComponent<MainBarPropsType>



/***************************
 *  Main Component
 */
const MainBar:MainBarType = ({children}) => {

    return (
        <section className={styles.wrapper}>
            {children}
        </section>
    )
}

export default MainBar;