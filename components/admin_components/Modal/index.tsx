import { FunctionComponent } from "react";
import CatImageModal from "./CatImageModal";

/****************************
 *  Types
 */
interface ModalsProps {
}

type ModalsType = FunctionComponent<ModalsProps>;


/****************************
 *  Main Component
 */

const Modals:ModalsType = ({}) => {


    return (
        <>
            <CatImageModal/>
            <div className="modal-root"></div>
        </>
    );
}

export default Modals;