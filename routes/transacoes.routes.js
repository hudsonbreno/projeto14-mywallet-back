import { Router } from "express";
import { Home, NovaTransacao } from "../controllers/transacoes.controller.js"
import { validateSchema } from "../middlewares/validateSchema.middleware.js"
import { transacoesSchema } from "../schemas/transacoes.schema.js"
import { authValidation } from "../middlewares/auth.middleware.js"

const transacoesRouter = Router()

transacoesRouter.use(authValidation)

transacoesRouter.post("/nova-transacao/:tipo", validateSchema, NovaTransacao)
transacoesRouter.get("/home", Home)

export default transacoesRouter