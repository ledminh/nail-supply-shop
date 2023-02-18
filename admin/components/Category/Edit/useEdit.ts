import {useContext} from 'react';

import { AdminContext } from '../../../Context';
import { getCategories } from '../../../reducer/actions.Categories';

const useEdit = () => {
    const {state} = useContext(AdminContext);
    

    return {
        categories: getCategories(state)
    }
}

export default useEdit;