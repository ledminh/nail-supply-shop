import { FunctionComponent, useEffect, useState } from "react";

import styles from './SmallScreen.module.scss';

import Link from 'next/link';

import HamburgerSVG from '../../../assets/images/hamburger.svg';
import CloseSVG from '../../../assets/images/close_icon.svg';
import { useNavScreen } from "./hooks";

import { PageConfigType, SlugType } from "../../../config";

/***************************
 *  Types
 */
interface SmallScreenPropsType {
    currentPageSlug: SlugType|null,
    pageConfigs: PageConfigType[]
} 

type SmallScreenType = FunctionComponent<SmallScreenPropsType>



/***************************
 *  Main Component
 */
const SmallScreen:SmallScreenType = ({currentPageSlug, pageConfigs}) => {

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
                            pageConfigs.map((pCF, index) => (
                                <>
                                    {
                                        pCF.onNav &&
                                        <li key={index}>
                                            <Link href={pCF.path}
                                                className={currentPageSlug === pCF.slug? styles.current : ""}
                                            >
                                                {pCF.name}
                                            </Link>
                                        </li>

                                    }
                                </>
                            ))
                        }
                    </ul>
                </nav>  
            </div>
        </div>
    )
}

export default SmallScreen;