import { ActionType } from "./types";

const aboutHtmlTextReducer = (state:string, action:ActionType) => {
    switch(action.type) {
        case 'ABOUT/SET_HTML_TEXT':
            return action.payload;
        default:
            return state;
    }
}

export default aboutHtmlTextReducer;