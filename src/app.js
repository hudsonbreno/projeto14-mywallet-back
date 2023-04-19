import express from "express";
import dotenv from "dotenv";
import joi from "joi"
import { MongoClient } from "mongodb"
import bcrypt from "bcrypt"

const app = express()
app.use(express.json());
dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL)
try{
    await mongoClient.connect();
}
catch(err){
    console.log(err.message)
}
const db = mongoClient.db()



app.post("/cadastro", async()=>{
    try{
        const {nome, email, password, isPassword} = req.body


        const cadastroSchema = joi.object({
            nome: nome.string().required(),
            email: email.email().required(),
            password: password.min(3).required(),
            isPassword: isPassword().min(3).required()
        })

        const validation = cadastroSchema.validate(acessar, { abortEarly: false })
        if(validation.error){
            const errors = validation.error.details.map((details)=> details.message)
            return res.status(422).send(errors)
        } 
        
        const conflito = await db.collection("usuarios").find({email: email}).toArray()
        if (conflito) return res.status(409).send("E-mail já cadastrado")

        const hash = bcrypt.hashSync(password, 10)
        
        const cadastrar = await db.colletion("usuarios").insertOne({
            nome,
            email:email,
            senha:hash,
        }) 
        if(!cadastrar) return res.status(402).send("Erro 402")
        res.sendStatus(201)
    }
    catch(err){
        res.status(500).send(err.message)
    }
})

app.post("/login", async(req, res)=>{
    try{
        const logar = req. body

        const loginSchema = joi.object({
            email: email.email().required(),
            password: bcrypt(password)
        })

        const validar = loginSchema.validate(logar)
        if(!validar) return res.status(422).send("Formato errado")

        const conferir = await db.colletion("usuarios").find({email: logar.email})
        if(!conferir) return res.status(422).send("Formato errado")
        
    }
    catch(err){
        res.status(500).send(err.message)
    }
})

app.post("/nova-transacao/:tipo", async(req, res)=>{
    const {Authorizede} = req.headers

})

app.listen(5000)