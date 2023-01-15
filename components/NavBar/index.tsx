import { FunctionComponent } from "react";

import { GetServerSidePropsContext } from "next";

import SmallScreen from "./SmallScreen";
import LargeScreen from "./LargeScreen";



/***************************
 *  Types
 */
export interface LinkType {
    name: string,
    href: string
}

interface NavBarPropsType {
    currentPage?: string
} 

type NavBarType = FunctionComponent<NavBarPropsType>



/***************************
 *  Main Component
 */
const NavBar:NavBarType = ({currentPage}) => {




    return (
        <>
            <SmallScreen 
                currentPage={currentPage} 
                links={links}
            />
            <LargeScreen 
                currentPage={currentPage} 
                links={links}
                />
        </>
    )
}

export default NavBar;


// data

const links:LinkType[] = [
    {
        name: "Home",
        href: "/"
    },
    {
        name: "About",
        href: "/about"
    },
    {
        name: "Shop",
        href: "/shop"
    },
    {
        name: "Contact",
        href: "/contact"
    }
]


