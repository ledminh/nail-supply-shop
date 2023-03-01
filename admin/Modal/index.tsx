import { FunctionComponent, useContext } from "react";
import CatImageModal from "./CatImage";
import ProductImagesModal from "./ProductImages";

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
            <ProductImagesModal />
            <CatImageModal />
            <div className="modal-root"></div>
        </>
    );
}

export default Modals;