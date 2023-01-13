import { FunctionComponent } from "react";

import styles from './NavBar.module.scss';
import Link from "next/link";

/***************************
 *  Types
 */
interface NavBarPropsType {

} 

type NavBarType = FunctionComponent<NavBarPropsType>



/***************************
 *  Main Component
 */
const NavBar:NavBarType = () => {

    return (
        <nav className={styles.wrapper}>
            <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/shop">Shop</Link></li>
                <li><Link href="/contact">Contact</Link></li>
            </ul>
        </nav>
    )
}

export default NavBar;