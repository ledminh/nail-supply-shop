import { FunctionComponent } from "react";
import { _ProductType, _ProductGroupType } from "../../../../types";

import styles from './EditScreen.module.scss';

import useEditScreen from "./useEditScreen";

import SingleEdit from "./SingleEdit";
import GroupEdit from "./GroupEdit";

/***************************
 *  Types
 */
interface EditScreenPropsType {
    data: _ProductType | _ProductGroupType;
    setEditMode: (value:boolean) => void;
} 

type EditScreenType = FunctionComponent<EditScreenPropsType>



/***************************
 *  Main Component
 */
const EditScreen:EditScreenType = ({data, setEditMode}) => {

    const {currentMode} = useEditScreen({data});

    return (
        <div className={styles.wrapper}>
            {
                currentMode === "single" ? (
                    <SingleEdit />
                ) : (
                    <GroupEdit />
                )
            }       
        </div>
    )
}

export default EditScreen;