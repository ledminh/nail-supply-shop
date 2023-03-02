// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { addProduct, updateProduct,  deleteCategory, ProductType } from '../../database';

import { ProductRequestBody } from '../../admin/types';

type Data = {
  success: false,
  message: string,
} |
{
  success: true,
  product: ProductType | null
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if(req.method !== 'POST') {
    res.status(400).json({ 
      success: false,
      message: 'Method not allowed' 
    })
  }

  const reqBody: ProductRequestBody = req.body;
  const { type, data } = reqBody;

  if(type === 'add') {
    addProduct(data)
      .then((dbRes) => {
        if(dbRes[0] === 'success') {
          res.status(200).json({
            success: true, 
            product: dbRes[1]
          })
        }
        else {
          res.status(400).json({
            success: false,
            message: dbRes[1]
          })
        }
      })
      .catch((err) => {
        console.log(err);

        res.status(400).json({
          success: false,
          message: 'Error adding product'
        });
      });
  }
  else if(type === 'update') {
    updateProduct(data)
      .then((dbRes) => {
        if(dbRes[0] === 'success') {
          res.status(200).json({
            success: true, 
            product: dbRes[1]
          })
        }
        else {
          res.status(400).json({
            success: false,
            message: dbRes[1]
          })
        }
      });

  }
//   else if(type === 'delete') {
//     deleteCategory(data.id)
//       .then((dbRes) => {
        
//         if(dbRes[0] === 'success') {
//           res.status(200).json({
//             success: true, 
//             category: null
//           })
//         }
//         else {
//           res.status(200).json({
//             success: false,
//             message: dbRes[1]
//           })
//         }
//       });
//   }
  else {
    res.status(400).json({
      success: false,
      message: 'Invalid request type'
    })
  }

}
