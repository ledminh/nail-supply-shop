import { FunctionComponent } from "react";

import styles from './NavBar.module.scss';
import Link from "next/link";
import SmallScreen from "./SmallScreen";
import LargeScreen from "./LargeScreen";

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
        <>
            <SmallScreen/>
            <LargeScreen/>
        </>
    )
}

export default NavBar;