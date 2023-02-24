import { FunctionComponent } from "react";
import AdminSubSection from "../../../../layouts/AdminSubSection";

import styles from './Add.module.scss';
import GroupAdd from "./GroupAdd";
import SingleAdd from "./SingleAdd";

import useAdd from "./useAdd";

/***************************
 *  Types
 */
interface AddPropsType {
    
} 

type AddType = FunctionComponent<AddPropsType>



/***************************
 *  Main Component
 */
const Add:AddType = () => {

    const {
        currentMode,
        onSingleClick,
        onGroupClick,
        onAddClick,
        onCancelClick,
    } = useAdd();



    return (
        <AdminSubSection
            title="Add New Product"
            bold
            collapsable
            >
            <form className={styles.wrapper}>
                <div className={styles.buttons}>
                    <button 
                        className={currentMode === "single" ? styles.active : styles.inactive} 
                        onClick={onSingleClick}>
                            Single
                    </button>
                    <button 
                        className={currentMode === "group" ? styles.active : styles.inactive} 
                        onClick={onGroupClick}>
                            Group
                    </button>
                    <div className={styles.slider} />
                </div>
                {
                    currentMode === "group" ?
                    <GroupAdd stylesField={styles.field} />
                    :
                    <SingleAdd stylesField={styles.field} />
                }
                <div className={styles.buttons}>
                    <button className={styles.button + " " + styles.add}
                        onClick={onAddClick}>
                        Add
                    </button>
                    <button className={styles.button + " " + styles.cancel}
                        onClick={onCancelClick}>
                        Cancel
                    </button>
                </div>
            </form>
        </AdminSubSection>
    )
}

export default Add;