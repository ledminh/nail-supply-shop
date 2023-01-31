import { FunctionComponent } from "react";

import styles from './LargeScreen.module.scss';

import Link from 'next/link';

import { SlugType, PageInfoType } from "../../../config";

/***************************
 *  Types
 */
interface LargeScreenPropsType {
    currentPageSlug: SlugType|null,
    pageInfos: PageInfoType[]
} 

type LargeScreenType = FunctionComponent<LargeScreenPropsType>



/***************************
 *  Main Component
 */
const LargeScreen:LargeScreenType = ({currentPageSlug, pageInfos}) => {



    return (
        <nav className={styles.wrapper}>
            <ul className={styles.ul}>
                {
                    pageInfos.map((pIF) => (
                        <>
                            {   
                                pIF.onNav && (
                                    <li key={pIF.slug}>
                                        <Link className={currentPageSlug === pIF.slug? styles.current : ""} 
                                            href={pIF.path}>
                                            {pIF.title}
                                        </Link>
                                    </li>
                                )
                            }
                        </>
                    ))
                }
            </ul>
        </nav>
    )
}

export default LargeScreen;