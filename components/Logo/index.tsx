import { FunctionComponent } from "react";

import styles from './Logo.module.scss';


/***************************
 *  Types
 */
interface LogoPropsType {

} 

type LogoType = FunctionComponent<LogoPropsType>



/***************************
 *  Main Component
 */
const Logo:LogoType = () => {


    return (
        <div className={styles.wrapper}
            onClick={() => window.location.href = '/'}
            >
            NAIL SUPPLY
        </div>
    )
}

export default Logo;