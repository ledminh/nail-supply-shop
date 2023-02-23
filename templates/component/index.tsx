import { FunctionComponent } from "react";

import styles from './templatename.module.scss';

import usetemplatename from "./useTemplateName";

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

    const {} = usetemplatename({});

    return (
        <div className={styles.wrapper}>
            TemplateName component
        </div>
    )
}

export default templatename;