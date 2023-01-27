import { FunctionComponent } from "react";

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
                <p>Sorry, there was some error going on here.</p>
                <ul>
                    {
                        errMessages.map((errMessage, index) => (
                            <li key={index}>{errMessage}</li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default ErrorScreen;