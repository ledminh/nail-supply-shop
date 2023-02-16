import { FunctionComponent, ReactNode } from "react";

import ModalContext, {useModalContext} from "./ModalContext";



type ContextComponent = FunctionComponent<{children:ReactNode}>;



const Contexts:ContextComponent = ({children}) => {
    
    const modalContextData = useModalContext();
    
    return (
        <ModalContext.Provider value={modalContextData}>
            {children}   
        </ModalContext.Provider>
    )
}

export default Contexts;