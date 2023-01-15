import { useState, useEffect } from 'react';

export const useNavScreen = () => {
    const [isOpen, setIsOpen] = useState(false);

    // close the nav screen when a link is clicked
    const closeNav = () => setIsOpen(false);
    const openNav = () => setIsOpen(true);

    const toggleNav = isOpen? closeNav : openNav;

    const handleToggleNav = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        toggleNav();
    }


    useEffect(() => {
        // add event listener to close the nav screen when a link is clicked
        document.addEventListener('click', closeNav);
        
        // remove event listener when component unmounts
        return () => document.removeEventListener('click', closeNav);
    
    }, []);

    return { isNavOpen:isOpen, handleToggleNav };
}