import { ReactNode } from 'react';

import styles from './ListLayout.module.scss';

import ItemLayout from './ItemLayout';


/***************************
 *  Types
 */




interface Props<T> {
    wrapperClassName?: string;
    liClassName?: string;
    imageClassName?: string;
    renderItemBody: (item:T) => ReactNode;
    keyExtractor: (item:T) => string;
    getItemName: (item:T) => string;
    getItemUrl: (item:T) => string;
    getItemImageUrl: (item:T) => string;
    data: T[];

    FirstItem?: {
        name?: string;
        url?: string;
        imageUrl?: string;
        component: ReactNode;
    };
    
    LastItem?: {
        name?: string;
        url?: string;
        imageUrl?: string;
        component: ReactNode;
    };



}



/***************************
 *  Main Component
 */
const ListLayout = <T extends unknown>({wrapperClassName, liClassName, imageClassName, renderItemBody, keyExtractor, getItemName, getItemUrl, getItemImageUrl, data, FirstItem, LastItem}:Props<T>) => {

    return (
        <ul className={`${styles.wrapper}${wrapperClassName? ' ' + wrapperClassName: ''}`}>
            {
                FirstItem? (
                    <li className={`${styles.li}${liClassName? ' ' + liClassName: ''}`}>
                        <ItemLayout
                            name={FirstItem.name? FirstItem.name : 'FirstItem'}
                            url={FirstItem?.url}
                            imageUrl={FirstItem?.imageUrl}
                            imageClassName={imageClassName}
                            >
                        {FirstItem.component}
                        </ItemLayout>
                    </li>
                ) : null
            }
            {
                data.map((item) => (
                    <li key={keyExtractor(item)} 
                        className={`${styles.li}${liClassName? ' ' + liClassName: ''}`}>
                        <ItemLayout
                            name={getItemName(item)}
                            url={getItemUrl(item)}
                            imageUrl={getItemImageUrl(item)}
                            imageClassName={imageClassName}
                            >
                            {renderItemBody(item)}
                        </ItemLayout>
                    </li>
                ))
            }
            {
                LastItem? (
                    <li className={`${styles.li}${liClassName? ' ' + liClassName: ''}`}>
                        <ItemLayout
                            name={LastItem.name? LastItem.name : 'Last Item'}
                            url={LastItem?.url}
                            imageUrl={LastItem?.imageUrl}
                            imageClassName={imageClassName}
                            >
                        {LastItem.component}
                        </ItemLayout>
                    </li>
                ) : null
            }
        </ul>
    )
}


export default ListLayout;