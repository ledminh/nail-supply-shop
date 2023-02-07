import { FunctionComponent } from "react";

import styles from './MoreButton.module.scss';

/***************************
 *  Types
 */
interface MoreButtonPropsType {
    onClick: () => void;
} 

type MoreButtonType = FunctionComponent<MoreButtonPropsType>



/***************************
 *  Main Component
 */
const MoreButton:MoreButtonType = ({onClick}) => {

    return (
        <div className={styles.wrapper} onClick={onClick}>
            <button><h3 className={styles.title}>MORE</h3></button>
        </div>
    )
}

export default MoreButton;