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
        onAddClick,
        onCancelClick
    } = useAdd();

    


    return (
        <AdminSubSection
            title="Add New Product"
            bold
            collapsable
            >
            <form className={styles.wrapper}>
                <div className={styles.field}>
                    <button className={styles.single}>Single</button>
                    <button className={styles.group}>Group</button>
                </div>
                <GroupAdd stylesField={styles.field} />
                <SingleAdd stylesField={styles.field} />
                <div className={styles.field}>
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