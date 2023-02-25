// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { addCategory, updateCategory, deleteCategory, CategoryType } from '../../database';

import { CategoryRequestBody } from '../../admin/types';

type Data = {
  success: false,
  message: string,
} |
{
  success: true,
  category: CategoryType | null
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

  const reqBody: CategoryRequestBody = req.body;
  const { type, data } = reqBody;

  if(type === 'add') {
    addCategory(data)
      .then((dbRes) => {
        if(dbRes[0] === 'success') {
          res.status(200).json({
            success: true, 
            category: dbRes[1]
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
          message: 'Error adding category'
        });
      });
  }
  else if(type === 'update') {
    updateCategory(data)
      .then((dbRes) => {
        if(dbRes[0] === 'success') {
          res.status(200).json({
            success: true, 
            category: dbRes[1]
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
  else if(type === 'delete') {
    deleteCategory(data.id)
      .then((dbRes) => {
        
        if(dbRes[0] === 'success') {
          res.status(200).json({
            success: true, 
            category: null
          })
        }
        else {
          res.status(200).json({
            success: false,
            message: dbRes[1]
          })
        }
      });
  }
  else {
    res.status(400).json({
      success: false,
      message: 'Invalid request type'
    })
  }

}
