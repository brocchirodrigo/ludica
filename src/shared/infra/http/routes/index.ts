import Router from "express";
import { typeformsRouter } from "./typeforms.routes";

const router = Router();

router.use('/ludica', typeformsRouter)

export { router };
