import { FunctionComponent } from "react";
import AdminSection from "../../../layouts/AdminSection";
import AdminSubSection from "../../../layouts/AdminSubSection";

import styles from './About.module.scss';

/***************************
 *  Types
 */
interface AboutPropsType {
    htmlText: string;
} 

type AboutType = FunctionComponent<AboutPropsType>



/***************************
 *  Main Component
 */
const About:AboutType = ({htmlText}) => {

    return (
        <AdminSection
            title="About"
        >
            <AdminSubSection
                title="About"
                last
            >
                <form className={styles.wrapper}>
                    <textarea
                        className={styles.textarea}
                        defaultValue={htmlText}
                        />
                    <button className={styles.button}>
                        Save
                    </button>
                </form>
            </AdminSubSection>
        </AdminSection>
    )
}

export default About;