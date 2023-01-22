import { useState, FunctionComponent } from "react";
import AdminSubSection from "../../../../layouts/AdminSubSection";

import styles from './Add.module.scss';



/***************************
 *  Types
 */
interface AddPropsType {
    onClick: (data: {name: string, description: string}) => void
} 

type AddType = FunctionComponent<AddPropsType>



/***************************
 *  Main Component
 */
const Add:AddType = ({onClick}) => {

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    


    return (
        <AdminSubSection
            title="Add"
            bold
            >
            <form className={styles.wrapper}>
                <div className={styles.field}>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="Name" id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor="Description">Description</label>
                    <input type="text" name="Description" id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button className={styles.button}
                    onClick={(e) => {
                        e.preventDefault();

                        onClick({
                            name,
                            description
                        });
                    }}
                    >
                    Add
                </button>
            </form>
        </AdminSubSection>
    )
}

export default Add;