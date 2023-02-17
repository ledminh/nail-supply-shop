import { FunctionComponent, ReactNode } from "react";

import AdminContext, {useAdminContext} from "./AdminContext";



type ContextComponent = FunctionComponent<{children:ReactNode}>;



const Contexts:ContextComponent = ({children}) => {
    
    const adminContextData = useAdminContext();
    
    return (
        <AdminContext.Provider value={adminContextData}>
            {children}   
        </AdminContext.Provider>
    )
}

export default Contexts;