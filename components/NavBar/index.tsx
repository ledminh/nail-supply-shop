import { FunctionComponent } from "react";

import SmallScreen from "./SmallScreen";
import LargeScreen from "./LargeScreen";
import { SlugType, pageInfos } from "../../config";

import styles from './NavBar.module.scss';



/***************************
 *  Types
 */


interface NavBarPropsType {
    currentPageSlug: SlugType|null
} 

type NavBarType = FunctionComponent<NavBarPropsType>



/***************************
 *  Main Component
 */
const NavBar:NavBarType = ({currentPageSlug}) => {

    const pageInfosArr = Object.values(pageInfos);


    return (
        <div className={styles.wrapper}>
            <SmallScreen 
                currentPageSlug={currentPageSlug} 
                pageInfos={pageInfosArr}
            />
            <LargeScreen 
                currentPageSlug={currentPageSlug} 
                pageInfos={pageInfosArr}
                />
        </div>
    )
}

export default NavBar;



