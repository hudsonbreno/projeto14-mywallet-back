import { db } from "../database/database.connection.js"
import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"

export async function signup(req, res){
    const {nome, email, password, isPassword} = req.body

    try{
        const conflito = await db.collection("usuarios").findOne({email: email})
        if (conflito) return res.status(409).send("E-mail já cadastrado")

        if(password != isPassword) return res.status(422).send("As duas senhas estão diferentes")

        const hash = bcrypt.hashSync(password, 10)
        
        const cadastrar = await db.collection("usuarios").insertOne({ nome,email,password:hash }) 
        if(!cadastrar) return res.status(402).send("Erro 402")
        res.sendStatus(201)
    }
    catch(err){
        res.status(500).send(err.message)
    }
}

export async function signin(req, res){
    try{
        const { email, password} = req. body

        const conferir = await db.collection("usuarios").findOne({email})
        if(conferir == null) return res.status(422).send("Email não cadastrado")
       
        const SenhaCorreta = bcrypt.compareSync(password, conferir.password)
        if(!SenhaCorreta) return res.status(422).send("Senha incorreta")

        const token = uuid();
        await db.collection('sessoes').insertOne({ token, userId: conferir._id });
        res.status(200).send({
            userId:conferir._id,
            token:token,
            nome: conferir.nome
        });
    }
    catch(err){
        res.status(500).send(err.message)
    }
}
