import joi from "joi"
export const usuarioSchema = joi.object({
        nome: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().min(3).required(),
        isPassword: joi.string().min(3).required()
})