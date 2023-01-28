import { FunctionComponent } from "react";

import { DBSubtitleType } from "../../../database";
import AdminSection from "../../../layouts/AdminSection";
import AdminSubSection from "../../../layouts/AdminSubSection";
import Item from "./Item";

/***************************
 *  Types
 */
interface SubtitlesPropsType {
    subtitles: DBSubtitleType[]
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