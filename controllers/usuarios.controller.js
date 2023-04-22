import { db } from "../database/database.connection.js"
import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"

export async function signup(req, res){
    const {nome, email, password, isPassword} = req.body

    try{
        const conflito = await db.collection("usuarios").findOne({email: email})
        if (conflito) return res.status(409).send("E-mail já cadastrado")

        const hash = bcrypt.hashSync(password, 10)
        
        const cadastrar = await db.collection("usuarios").insertOne({ nome,email,password:hash }) 
        if(!cadastrar) return res.status(402).send("Erro 402")
        res.sendStatus(201)
    }
    catch(err){
        console.log("aqui")
        res.status(500).send(err.message)
    }
}

export async function signin(req, res){
    try{
        const { email, password} = req. body

        const loginSchema = joi.object({
            email: joi.string().email().required(),
            password: joi.string().min(3).required()
        })

        const validar = loginSchema.validate(req.body)
        if(!validar) return res.status(422).send("Formato errado")

        const conferir = await db.collection("usuarios").findOne({email})
        if(conferir.length==0) return res.status(422).send("Email não cadastrado")
       
        const SenhaCorreta = bcrypt.compareSync(password, conferir.password)
        if(!SenhaCorreta) return res.status(422).send("Senha incorreta")

        const token = uuid();
        await db.collection('sessoes').insertOne({ token, userId: conferir._id });
        res.status(200).send(token);
    }
    catch(err){
        res.status(500).send(err.message)
    }
}
