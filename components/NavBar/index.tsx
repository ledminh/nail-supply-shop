import { FunctionComponent } from "react";

import SmallScreen from "./SmallScreen";
import LargeScreen from "./LargeScreen";
import { SlugType, pageInfos } from "../../config";



/***************************
 *  Types
 */


interface NavBarPropsType {
    currentPageSlug: SlugType | null
} 

type NavBarType = FunctionComponent<NavBarPropsType>



/***************************
 *  Main Component
 */
const NavBar:NavBarType = ({currentPageSlug}) => {

    const pageInfosArr = Object.values(pageInfos);



    return (
        <>
            <SmallScreen 
                currentPageSlug={currentPageSlug} 
                pageInfos={pageInfosArr.filter(pI => !pI.hide)}
            />
            <LargeScreen 
                currentPageSlug={currentPageSlug} 
                pageInfos={pageInfosArr.filter(pI => !pI.hide)}
                />
        </>
    )
}

export default NavBar;



