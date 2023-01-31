import { FunctionComponent } from "react";

import SmallScreen from "./SmallScreen";
import LargeScreen from "./LargeScreen";
import { SlugType, pageConfigs } from "../../config";

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

    const pageConfigsArr = Object.values(pageConfigs);


    return (
        <div className={styles.wrapper}>
            <SmallScreen 
                currentPageSlug={currentPageSlug} 
                pageConfigs={pageConfigsArr}
            />
            <LargeScreen 
                currentPageSlug={currentPageSlug} 
                pageConfigs={pageConfigsArr}
                />
        </div>
    )
}

export default NavBar;



