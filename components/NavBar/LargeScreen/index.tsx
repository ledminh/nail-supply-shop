import { FunctionComponent } from "react";

import styles from './LargeScreen.module.scss';

import Link from 'next/link';

import { SlugType, PageConfigType } from "../../../config";

/***************************
 *  Types
 */
interface LargeScreenPropsType {
    currentPageSlug: SlugType|null,
    pageConfigs: PageConfigType[]
} 

type LargeScreenType = FunctionComponent<LargeScreenPropsType>



/***************************
 *  Main Component
 */
const LargeScreen:LargeScreenType = ({currentPageSlug, pageConfigs}) => {



    return (
        <nav className={styles.wrapper}>
            <ul className={styles.ul}>
                {
                    pageConfigs.map((pCF) => (
                        pCF.onNav && (
                            <li key={pCF.slug}>
                                <Link className={currentPageSlug === pCF.slug? styles.current : ""} 
                                    href={pCF.path}>
                                    {pCF.name}
                                </Link>
                            </li>
                        )
                    ))
                }
            </ul>
        </nav>
    )
}

export default LargeScreen;