import { FunctionComponent, useContext } from "react";
import CatImageModal from "./CatImageModal";

import AdminContext from "../Context/AdminContext";

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

    const {setCatImageFileForm} = useContext(AdminContext);

    return (
        <>
            <CatImageModal setFileForm={setCatImageFileForm}/>
            <div className="modal-root"></div>
        </>
    );
}

export default Modals;