import { Router } from "express";
import { getOrderById, getOrders, patchOrder, postOrder } from "../controllers/orderController.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import orderSchema from "../schemas/orderSchema.js";

const orderRouter = Router();

orderRouter.post("/order", validateSchema(orderSchema, 400), postOrder);
orderRouter.get("/order", getOrders);
orderRouter.get("/order/:id", getOrderById);
orderRouter.patch("/order/:id", patchOrder);
export default orderRouter;