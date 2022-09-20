import { Router } from 'express';

import { RequestFormsController } from '@modules/typeform/forms/controller/RequestFormsController'
import { RequestFormsHeadersController } from '@modules/typeform/forms/controller/RequestFormsHeadersController';
import { RequestFormsResponsesController } from '@modules/typeform/responses/controller/RequestFormsResponsesController';

const typeformsRouter = Router();

const requestFormsController = new RequestFormsController();
const requestFormsHeadersController = new RequestFormsHeadersController();
const requestFormsResponsesController = new RequestFormsResponsesController();


typeformsRouter.get('/forms', requestFormsController.handle);
typeformsRouter.get('/forms/headers', requestFormsHeadersController.handle);
typeformsRouter.get('/forms/responses', requestFormsResponsesController.handle);


export { typeformsRouter }
