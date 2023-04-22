import {Router} from "express"
import usuariosRouter from "./usuarios.routes.js"
import transacoesRouter from "./transacoes.routes.js"

const router = Router()
router.use(usuariosRouter)
router.use(transacoesRouter)

export default router