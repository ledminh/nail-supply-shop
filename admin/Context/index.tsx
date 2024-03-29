import { FunctionComponent, ReactNode, createContext } from "react";

import useAdminContext, {AdminContextType, initialAdminContext} from "./useAdminContext";
import { CategoryType, ProductType, ProductGroupType } from "../../database";

/***************************************
 * Create a context
 */



export const AdminContext = createContext<AdminContextType>(initialAdminContext);



type Props = {
    children:ReactNode;
    categories:CategoryType[];
    products:(ProductType|ProductGroupType)[];
    aboutHtmlText:string;
}

type ContextComponent = FunctionComponent<Props>;


const Context:ContextComponent = ({children, categories, products, aboutHtmlText}) => {
    
    const adminContextData = useAdminContext({categories, products, aboutHtmlText});
    
    return (
        <AdminContext.Provider value={adminContextData}>
            {children}   
        </AdminContext.Provider>
    )
}

export default Context;



