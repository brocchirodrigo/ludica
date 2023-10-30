import { BrasilApiController } from '@modules/BrasilAPI/controller/BrasilApiController';
import { Router } from 'express';

const brasilApiController = new BrasilApiController();

const BrasilApiRoutes = Router();

BrasilApiRoutes.get('/api', brasilApiController.handle);

export { BrasilApiRoutes }
