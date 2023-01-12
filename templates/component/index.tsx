import { FunctionComponent } from "react";

import styles from './templatename.module.scss';

/***************************
 *  Types
 */
interface templatenamePropsType {

} 

type templatenameType = FunctionComponent<templatenamePropsType>



/***************************
 *  Main Component
 */
const templatename:templatenameType = () => {

    return (
        <div className={styles.wrapper}>
            TemplateName component
        </div>
    )
}

export default templatename;