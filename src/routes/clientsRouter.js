import { Router } from "express";
import { getClientOrderById, postClient } from "../controllers/clientController.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import clientSchema from "../schemas/clientSchema.js";

const clientsRouter = Router();

clientsRouter.post("/clients",validateSchema(clientSchema, 400), postClient);
clientsRouter.get("/clients/:id/order", getClientOrderById);

export default clientsRouter;