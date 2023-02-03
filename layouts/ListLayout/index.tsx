import styles from './ListLayout.module.scss';

import ItemLayout from './ItemLayout';


/***************************
 *  Types
 */
interface Props<T> {
    renderItemBody: (item:T & {
        name: string;
        url: string;
        imageUrl: string;
    }) => React.ReactNode;
    keyExtractor: (item:T & {
        name: string;
        url: string;
        imageUrl: string;
    }) => string;
    data: (T & {
        name: string;
        url: string;
        imageUrl: string; 
    })[];
}



/***************************
 *  Main Component
 */
const ListLayout = <T extends unknown>({renderItemBody, keyExtractor, data}:Props<T>) => {

    return (
        <ul className={styles.wrapper}>
        {
            data.map((item) => (
                <li key={keyExtractor(item)} className={styles.item}>
                    <ItemLayout 
                        name={item.name}
                        url={item.url}
                        imageUrl={item.imageUrl}
                        >
                        {renderItemBody(item)}
                    </ItemLayout>
                </li>
            ))
        }
        </ul>
    )
}


export default ListLayout;