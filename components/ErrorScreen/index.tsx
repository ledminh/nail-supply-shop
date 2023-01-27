import { FunctionComponent } from "react";
import Link from 'next/link';

import styles from './ErrorScreen.module.scss';


/***************************
 *  Types
 */
interface ErrorScreenPropsType {
    errMessages: string[];
} 

type ErrorScreenType = FunctionComponent<ErrorScreenPropsType>



/***************************
 *  Main Component
 */
const ErrorScreen:ErrorScreenType = ({errMessages}) => {



    return (
        <div className={styles.wrapper}>
            <h3 className={styles.header}>Error</h3>
            <div className={styles.body}>
                <p className={styles.intro}>Sorry, there was some error going on here.</p>
                <ul className={styles.errors}>
                    {
                        errMessages.map((errMessage, index) => (
                            <li key={index}>{errMessage}</li>
                        ))
                    }
                </ul>
                <p className={styles.goBack}>Go back <Link href="/">Home</Link></p>
            </div>
        </div>
    )
}

export default ErrorScreen;