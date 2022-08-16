import { Router } from "express";
import { postCake } from "../controllers/cakeController.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import {cakeSchema, cakeUriSchema} from "../schemas/cakeSchema.js";

 const cakeRouter = Router();

 cakeRouter.post("/cakes", validateSchema(cakeSchema, 422), validateSchema(cakeUriSchema, 409), postCake);

 export default cakeRouter;