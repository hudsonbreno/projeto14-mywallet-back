import joi from "joi"
export const transacoesSchema = joi.object({
    valor: joi.number().integer().positive().required(),
    descricao: joi.string().required()
})