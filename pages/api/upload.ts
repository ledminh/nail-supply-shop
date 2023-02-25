import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import multer from 'multer';


type MulterRequest = NextApiRequest & {
  file: Express.Multer.File;
  files: Express.Multer.File[];
};

const catImageUpload = multer({
  storage: multer.diskStorage({
    destination: './public/images/category',
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

const productImagesUpload = multer({
  storage: multer.diskStorage({
    destination: './public/images/product',
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    console.log(error);

    res.statusCode = 501;
    res.end(
      JSON.stringify({ error: `Sorry something Happened! ${error.message}` })
    );
  },
  onNoMatch(req, res) {
    res.statusCode = 405;
    res.end(
      JSON.stringify({ error: `Method '${req.method}' Not Allowed` })
    );
  },
});


apiRoute.use((
  req: MulterRequest,
  res: NextApiResponse
  ) => {
  const { type } = req.query;

  if (type === 'cat-image') {
    catImageUpload.single('cat-image')(req as any, res as any, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      }

      return res.status(200).json({ filename: req.file.filename });
  });

  } else if (type === 'product-images') {
    productImagesUpload.array('product-images')(req as any, res as any, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
      }

      return res.status(200).json({ filenames: req.files.map((f) => f.filename) });
    });
  } else {
    return res.status(400).json({ error: 'Invalid type' });
  }
});







export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
