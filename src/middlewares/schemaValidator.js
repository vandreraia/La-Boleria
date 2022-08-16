export function validateSchema(schema, status) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(status).send("Preencha todos os campos corretamente");
        }

        next();
    }
}