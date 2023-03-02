// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { DeleteFileRequestBody } from '../../admin/types';

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

    const { fileName,  type } = req.body as DeleteFileRequestBody;

    const fs = require('fs');

    const appRoot = require('app-root-path');
    
    const filePath = appRoot + (type === 'cat-image'? `/public/images/category/${fileName}`: `/public/images/product/${fileName}`);
    
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
