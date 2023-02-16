// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { DeleteFileOptions } from '../../types';


type Data = {
    success: boolean,
    message: string,
}


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    

    if (req.method !== 'POST') {
        res.statusCode = 405;
        res.end(JSON.stringify({ error: `Method '${req.method}' Not Allowed` }));
    }

    const { fileName, type } = req.body;


    if (type === 'cat-image') {
        // delete file in public/images/category

        const fs = require('fs');

        const appRoot = require('app-root-path');
        
        const filePath = appRoot + `/public/images/category/${fileName}`;
        
        fs.unlink(filePath, (err: Error) => {

            if (err) {
                res.statusCode = 501;
                console.log(err)
                res.end(JSON.stringify({ error: `Sorry something Happened! ${err.message}` }));
            }



            res.end(JSON.stringify({
                success: true,
                message: 'file deleted'
            }))
        });


    } 


}
