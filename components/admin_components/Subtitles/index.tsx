import { FunctionComponent } from "react";

import AdminSection from "../../../layouts/AdminSection";
import AdminSubSection from "../../../layouts/AdminSubSection";
import Item from "./Item";

/***************************
 *  Types
 */
interface SubtitlesPropsType {
    subtitles: {
        id: string,
        name: string
    }[]
} 

type SubtitlesComponentType = FunctionComponent<SubtitlesPropsType>



/***************************
 *  Main Component
 */
const Subtitles:SubtitlesComponentType = ({subtitles}) => {

    return (
        <AdminSection
            title="Subtitles"
        >
            <AdminSubSection
                title="Edit subtitles"
                last
            >
                {
                    subtitles.map((subtitle) => (
                        <Item 
                            key={subtitle.id}
                            name={subtitle.name}
                        />
                    ))
                }
            </AdminSubSection>
        </AdminSection>
        
    )
}

export default Subtitles;