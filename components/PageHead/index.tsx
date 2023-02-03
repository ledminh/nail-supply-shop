import { FunctionComponent } from "react";

import Head from "next/head";

/***************************
 *  Types
 */
interface PageHeadPropsType {
    title: string;
    description: string;
} 

type PageHeadType = FunctionComponent<PageHeadPropsType>



/***************************
 *  Main Component
 */
const PageHead:PageHeadType = ({title, description}) => {

    return (
        <Head>
            <title>{`${title} :: Nail Supply Shop`}</title>
            <meta name="description" content={description} />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}

export default PageHead;