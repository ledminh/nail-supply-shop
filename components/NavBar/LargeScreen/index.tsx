import { FunctionComponent } from "react";

import styles from './LargeScreen.module.scss';

import Link from 'next/link';

/***************************
 *  Types
 */
interface LargeScreenPropsType {

} 

type LargeScreenType = FunctionComponent<LargeScreenPropsType>



/***************************
 *  Main Component
 */
const LargeScreen:LargeScreenType = () => {

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

export default LargeScreen;