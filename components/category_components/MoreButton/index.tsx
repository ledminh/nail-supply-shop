import { FunctionComponent } from "react";

import styles from './MoreButton.module.scss';

/***************************
 *  Types
 */
interface MoreButtonPropsType {

} 

type MoreButtonType = FunctionComponent<MoreButtonPropsType>



/***************************
 *  Main Component
 */
const MoreButton:MoreButtonType = () => {

    return (
        <div className={styles.wrapper}>
            <h3 className={styles.title}>MORE</h3>
        </div>
    )
}

export default MoreButton;