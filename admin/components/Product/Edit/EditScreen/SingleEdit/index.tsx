import { FunctionComponent } from "react";

import styles from './SingleEdit.module.scss';

import useSingleEdit from "./useSingleEdit";

/***************************
 *  Types
 */
interface SingleEditPropsType {

} 

type SingleEditType = FunctionComponent<SingleEditPropsType>



/***************************
 *  Main Component
 */
const SingleEdit:SingleEditType = () => {

    const {} = useSingleEdit({});

    return (
        <div className={styles.wrapper}>
            SingleEdit component
        </div>
    )
}

export default SingleEdit;