import { Router } from 'express';

import { RequestFormsController } from '@modules/typeform/forms/controller/RequestFormsController'

const typeformsRouter = Router();

const requestFormsController = new RequestFormsController();

typeformsRouter.get('/forms', requestFormsController.handle)

export { typeformsRouter }
