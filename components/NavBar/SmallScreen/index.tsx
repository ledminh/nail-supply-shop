import { FunctionComponent, useEffect, useState } from "react";

import styles from './SmallScreen.module.scss';

import Link from 'next/link';

import HamburgerSVG from '../../../assets/images/hamburger.svg';
import CloseSVG from '../../../assets/images/close_icon.svg';
import { useNavScreen } from "./hooks";

import { SlugType, PageInfoType } from "../../../config";

/***************************
 *  Types
 */
interface SmallScreenPropsType {
    currentPageSlug: SlugType | null,
    pageInfos: PageInfoType[]
} 

type SmallScreenType = FunctionComponent<SmallScreenPropsType>



/***************************
 *  Main Component
 */
const SmallScreen:SmallScreenType = ({currentPageSlug, pageInfos}) => {

    const {isNavOpen, handleToggleNav} = useNavScreen();
    
    useEffect(() => {
        if(isNavOpen){
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isNavOpen]);


    return (
        <div className={styles.wrapper}>
            <button className={styles.toggleBtn}
                onClick={handleToggleNav}
            >
                {
                    isNavOpen? 
                        <CloseSVG
                            stroke="black"
                        /> :
                        <HamburgerSVG
                            stroke="#f2ddd6"
                            />
                }
            </button>
            <div className={`${styles.navScreen} ${isNavOpen? styles['open'] : styles['close']}`}>
                <nav className={styles.nav}>
                    <ul>
                        {
                            pageInfos.map((pIF, index) => (
                                <li key={index}>
                                    <Link href={pIF.url}
                                        className={currentPageSlug === pIF.slug? styles.current : ""}
                                    >
                                        {pIF.title}
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