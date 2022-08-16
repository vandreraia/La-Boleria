import joi from "joi";

const orderSchema = joi.object({
    clientId: joi.number().required(),
    cakeId: joi.number().required(),
    quantity: joi.number().min(0).max(5).required(),
    totalPrice: joi.number().required()
});

export default orderSchema;