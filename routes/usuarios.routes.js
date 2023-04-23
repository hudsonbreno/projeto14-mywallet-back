import { Router } from "express"
import { signin, signup } from "../controllers/usuarios.controller.js"
import { validateSchema } from "../middlewares/validateSchema.middleware.js"
import { usuarioSchema } from "../schemas/usuarios.schema.js"
import { loginSchema } from "../schemas/usuarios.schema.js";
import { authValidation } from "../middlewares/auth.middleware.js";

const usuariosRouter = Router()

usuariosRouter.post("/cadastro", validateSchema(usuarioSchema), signup)
usuariosRouter.post("/", validateSchema(loginSchema), signin)

export default usuariosRouter