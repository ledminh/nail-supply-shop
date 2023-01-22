import { useState, FunctionComponent } from "react";

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
        <div className={styles.wrapper}>
            <h4>Add</h4>
            <form className={styles.form}>
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
        </div>
    )
}

export default Add;