import {useState, createContext} from 'react';

export type ModalContextType = {
    isCatImageShown: boolean;
    setCatImageShow: (isCatImageShown: boolean) => void;
}

type useModalContextType =  () => ModalContextType;


const modalContextDefaultValues: ModalContextType = {
    isCatImageShown: false,
    setCatImageShow: () => {}
};


const ModalContext = createContext<ModalContextType>(modalContextDefaultValues);

export const useModalContext:useModalContextType = () => {
    const [isCatImageShown, setCatImageShow] = useState(false);

    return {
        isCatImageShown,
        setCatImageShow
    };
}

export default ModalContext;