const Joi = require("joi");

const validate = (schema, params, res, next) => {
    const { error } = schema.validate(params);

    if (error) {
        console.log({ error: error.details[0].message });
        return res.status(400).json({ error: error.details[0].message });
    }

    next();
};

const validateParamId = (req, res, next) => {
    const schema = Joi.object({
        id: Joi.number().integer().positive().required().messages({
            "number.base": "El ID debe ser un número",
            "number.integer": "El ID debe ser un número entero",
            "number.positive": "El ID debe ser un número positivo",
            "any.required": "El ID es requerido",
        }),
    });

    validate(schema, req.params, res, next);
};

const validateBody = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(35).required(),
        description: Joi.string().min(1).max(300).allow("").allow(null),
        imageFileName: Joi.string().min(2).max(150),
        stock: Joi.number().integer().min(0).required(),
        price: Joi.number().min(1).required(),
        isPromotion: Joi.boolean().required(),
        isFreeShip: Joi.boolean().required(),
        brand:  Joi.string().required(),
        type: Joi.string().required(),
        category: Joi.string().required(),
    });

    validate(schema, req.body, res, next);
};

module.exports = {
    validateParamId,
    validateBody,
};