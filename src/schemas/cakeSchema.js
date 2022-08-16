import joi from "joi";

export const cakeSchema = joi.object({
    name: joi.string().min(2).required(),
    price: joi.number().min(0).required(),
    image: joi.string().required(),
    description: joi.string().required()
});

export const cakeUriSchema = joi.object({
    name: joi.string().required(),
    price: joi.number().required(),
    image: joi.string().uri().required(),
    description: joi.string().required()
});