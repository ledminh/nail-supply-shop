import { ReactNode } from 'react';

import styles from './ListLayout.module.scss';

import ItemLayout from './ItemLayout';


/***************************
 *  Types
 */

type ItemType<T> = T& {
    name: string;
    url: string;
    imageUrl: string;
};


interface Props<T> {
    wrapperClassName?: string;
    liClassName?: string;
    imageClassName?: string;
    renderItemBody: (item:ItemType<T>) => ReactNode;
    keyExtractor: (item:ItemType<T>) => string;
    data: ItemType<T>[];
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
const ListLayout = <T extends unknown>({wrapperClassName, liClassName, imageClassName, renderItemBody, keyExtractor, data, LastItem}:Props<T>) => {

    return (
        <ul className={`${styles.wrapper}${wrapperClassName? ' ' + wrapperClassName: ''}`}>
            {
                data.map((item) => (
                    <li key={keyExtractor(item)} 
                        className={`${styles.li}${liClassName? ' ' + liClassName: ''}`}>
                        <ItemLayout
                            name={item.name}
                            url={item.url}
                            imageUrl={item.imageUrl}
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