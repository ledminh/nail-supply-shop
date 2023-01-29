import { FunctionComponent, ReactNode } from "react";

import styles from './MobileBar.module.scss';

/***************************
 *  Types
 */
interface MobileBarPropsType {
    children: ReactNode;
} 

type MobileBarType = FunctionComponent<MobileBarPropsType>



/***************************
 *  Main Component
 */
const MobileBar:MobileBarType = ({children}) => {

    return (
        <section className={styles.wrapper}>
            {children}
        </section>
    )
}

export default MobileBar;