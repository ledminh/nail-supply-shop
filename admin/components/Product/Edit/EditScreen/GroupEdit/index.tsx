import { FunctionComponent } from "react";

import styles from './GroupEdit.module.scss';

import useGroupEdit from "./useGroupEdit";

/***************************
 *  Types
 */
interface GroupEditPropsType {

} 

type GroupEditType = FunctionComponent<GroupEditPropsType>



/***************************
 *  Main Component
 */
const GroupEdit:GroupEditType = () => {

    const {} = useGroupEdit({});

    return (
        <div className={styles.wrapper}>
            GroupEdit component
        </div>
    )
}

export default GroupEdit;