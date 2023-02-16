import { FunctionComponent } from "react";
import CatImageModal from "./CatImageModal";

/****************************
 *  Types
 */
interface ModalsProps {
    isCatImageShown: boolean;
    setCatImageShow: (show:boolean) => void;
}

type ModalsType = FunctionComponent<ModalsProps>;


/****************************
 *  Main Component
 */

const Modals:ModalsType = ({isCatImageShown, setCatImageShow}) => {


    return (
        <>
            <CatImageModal
                show={isCatImageShown}
                setShow={setCatImageShow}
            />
            <div className="modal-root"></div>
        </>
    );
}

export default Modals;