import { Router } from 'express';

import { RequestFormsController } from '@modules/typeform/forms/controller/RequestFormsController'
import { RequestFormsHeadersController } from '@modules/typeform/forms/controller/RequestFormsHeadersController';

const typeformsRouter = Router();

const requestFormsController = new RequestFormsController();
const requestFormsHeadersController = new RequestFormsHeadersController();


typeformsRouter.get('/forms', requestFormsController.handle);
typeformsRouter.get('/forms/headers', requestFormsHeadersController.handle);


export { typeformsRouter }
