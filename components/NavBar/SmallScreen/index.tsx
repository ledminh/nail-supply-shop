import { FunctionComponent, useEffect, useState } from "react";

import styles from './SmallScreen.module.scss';

import Link from 'next/link';

import HamburgerSVG from '../../../assets/images/hamburger.svg';
import CloseSVG from '../../../assets/images/close_icon.svg';
import { useNavScreen } from "./hooks";

import { LinkType } from '../../NavBar';

/***************************
 *  Types
 */
interface SmallScreenPropsType {
    currentPage?: string,
    links: LinkType[]
} 

type SmallScreenType = FunctionComponent<SmallScreenPropsType>



/***************************
 *  Main Component
 */
const SmallScreen:SmallScreenType = ({currentPage, links}) => {

    const {isNavOpen, handleToggleNav} = useNavScreen();
    

    return (
        <div className={styles.wrapper}>
            <button className={styles.toggleBtn}
                onClick={handleToggleNav}
            >
                {
                    isNavOpen? <CloseSVG/> :<HamburgerSVG/>
                }
            </button>
            <div className={`${styles.navScreen} ${isNavOpen? styles['open'] : styles['close']}`}>
                <nav className={styles.nav}>
                    <ul>
                        {
                            links.map((link, index) => (
                                <li key={index}>
                                    <Link href={link.href}
                                        className={currentPage === link.name? styles.current : ""}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </nav>  
            </div>
        </div>
    )
}

export default SmallScreen;