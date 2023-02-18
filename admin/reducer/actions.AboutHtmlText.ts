import { ActionType } from "./types";

export const setAboutHtmlText = (aboutHtmlText:string, dispatch: React.Dispatch<ActionType>) => {
    dispatch({
        type: 'SET_ABOUT_HTML_TEXT',
        payload: aboutHtmlText
    });
}