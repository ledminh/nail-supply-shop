import { ActionType } from "./types";

export const setAboutHtmlText = (aboutHtmlText:string, dispatch: React.Dispatch<ActionType>) => {
    dispatch({
        type: 'ABOUT/SET_HTML_TEXT',
        payload: aboutHtmlText
    });
}