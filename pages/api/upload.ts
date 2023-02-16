import nextConnect from 'next-connect';
import multer from 'multer';
import { IncomingMessage } from 'http';

const catImageUpload = multer({
  storage: multer.diskStorage({
    destination: './public/images/category',
    filename: (req, file, cb) => cb(null, file.originalname),
  }),

  
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.statusCode = 501;
    console.log(error);
    res.end(JSON.stringify({ error: `Sorry something Happened! ${error.message}` }));
  },
  onNoMatch(req, res) {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: `Method '${req.method}' Not Allowed` }));
  },
});


// get file from components/admin_components/UploadForm/index.tsx
apiRoute.use(catImageUpload.single('cat-image'), (req, res, next) => {
  req.body = {
    filename: req.file?.filename
  };
  next();
});

apiRoute.post((req: IncomingMessage &{body: {filename: string}}, res) => {
  res.statusCode = 200;

  res.end(JSON.stringify({
    filename: req.body.filename,
  }));
});


export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};