import { FunctionComponent } from "react";
import { ProductGroupType } from "../../../../../database";
import { _ProductType } from "../../../../types";

import styles from './EditScreen.module.scss';

import useEditScreen from "./useEditScreen";

/***************************
 *  Types
 */
interface EditScreenPropsType {
    data: _ProductType | ProductGroupType;
    setEditMode: (value:boolean) => void;
} 

type EditScreenType = FunctionComponent<EditScreenPropsType>



/***************************
 *  Main Component
 */
const EditScreen:EditScreenType = ({data, setEditMode}) => {

    const {} = useEditScreen({});

    return (
        <div className={styles.wrapper}>
            EditScreen component
        </div>
    )
}

export default EditScreen;