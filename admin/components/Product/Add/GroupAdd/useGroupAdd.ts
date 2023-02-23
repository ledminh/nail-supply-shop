import { useState, useContext } from "react";
import { AdminContext } from "../../../../Context";
import { getCategories } from "../../../../reducer/actions.Categories";

type useGroupAddParams = {
}

const useGroupAdd = ({}: useGroupAddParams) => {

    const { state } = useContext(AdminContext);
    




    /*************************************
     *  Public methods
     */

    const onCategoryChange = (e: any) => {}





    return {
        categories: getCategories(state),
        onCategoryChange,
    }
}

export default useGroupAdd;