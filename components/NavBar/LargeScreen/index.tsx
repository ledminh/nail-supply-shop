import { FunctionComponent } from "react";

import styles from './LargeScreen.module.scss';

import Link from 'next/link';

import { LinkType } from '../../NavBar';

/***************************
 *  Types
 */
interface LargeScreenPropsType {
    currentPage?: string,
    links: LinkType[]
} 

type LargeScreenType = FunctionComponent<LargeScreenPropsType>



/***************************
 *  Main Component
 */
const LargeScreen:LargeScreenType = ({currentPage, links}) => {



    return (
        <nav className={styles.wrapper}>
            <ul className={styles.ul}>
                {
                    links.map((link, index) => (
                        <li key={index}>
                            <Link className={currentPage === link.name? styles.current : ""} 
                                href={link.href}>
                                {link.name}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}

export default LargeScreen;