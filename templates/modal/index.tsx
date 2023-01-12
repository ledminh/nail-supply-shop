import { FunctionComponent } from "react";
// import SampleModal from "./SampleModal";

/****************************
 *  Types
 */
interface ModalsProps {
    show: boolean,
    setShow: (show:boolean) => void
}

type ModalsType = FunctionComponent<ModalsProps>;


/****************************
 *  Main Component
 */

const Modals:ModalsType = ({show, setShow}) => {


    return (
        <>
            {/* <SampleModal
                show={true}
                setShow={() => {}}
            /> */}
            <div className="modal-root"></div>
        </>
    );
}

export default Modals;