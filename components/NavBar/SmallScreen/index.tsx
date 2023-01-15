import { FunctionComponent, useEffect, useState } from "react";

import styles from './SmallScreen.module.scss';

import Link from 'next/link';

import HamburgerSVG from '../../../assets/images/hamburger.svg';
import CloseSVG from '../../../assets/images/close_icon.svg';
import { useNavScreen } from "./hooks";


/***************************
 *  Types
 */
interface SmallScreenPropsType {

} 

type SmallScreenType = FunctionComponent<SmallScreenPropsType>



/***************************
 *  Main Component
 */
const SmallScreen:SmallScreenType = () => {

    const {isNavOpen, handleToggleNav} = useNavScreen();
    

    return (
        <div className={styles.wrapper}>
            <button className={styles.toggleBtn}
                onClick={handleToggleNav}
            >
                {
                    isNavOpen? <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    preserveAspectRatio="none"
                    stroke="currentColor"
                    stroke-width="2"

                  >
                      <line x1="0" y1="0" x2="100%" y2="100%" />
                      <line x1="0" y1="100%" x2="100%" y2="0" />
                  </svg> :<HamburgerSVG/>
                }
            </button>
            <div className={`${styles.navScreen} ${isNavOpen? styles['open'] : styles['close']}`}>
                <nav className={styles.nav}>
                    <ul>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/about">About</Link></li>
                        <li><Link href="/shop">Shop</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                    </ul>
                </nav>  
            </div>
        </div>
    )
}

export default SmallScreen;