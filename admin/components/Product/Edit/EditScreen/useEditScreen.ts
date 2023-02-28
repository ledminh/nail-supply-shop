import { _ProductGroupType, _ProductType } from "../../../../types";

type useEditScreenParams = {
    data: _ProductType | _ProductGroupType;
}

const useEditScreen = ({data}: useEditScreenParams) => {



    return {
        currentMode: Array.isArray(data) ? 'group' : 'single',
    }
}

export default useEditScreen;