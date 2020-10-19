import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OrphagenesController from './controllers/OrphanegesController';

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/orphaneges', upload.array('images') ,OrphagenesController.create);
routes.get('/orphaneges', OrphagenesController.index);
routes.get('/orphaneges/:id', OrphagenesController.show);

export default routes