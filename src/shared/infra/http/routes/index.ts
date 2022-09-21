import Router from "express";
import { typeformsRouter } from "./typeforms.routes";
import { BrasilApiRoutes } from './BrasilApi.routes'

const router = Router();

router.use('/ludica', typeformsRouter)
router.use('/bra', BrasilApiRoutes)

export { router };
