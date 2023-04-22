import { db } from "../database/database.connection.js"
import { ObjectId } from "mongodb"

export async function NovaTransacao(req, res){
    const { authorization } = req.headers
    const token = req.body
    const tipo = req.params
}
// app.post("/nova-transacao/:tipo", async(req, res)=>{

export async function Home(req, res){
    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", "")

    if (!token) return res.sendStatus(401)

    const sessoes = await db.collection("sessoes").findOne({token})
    if(!sessoes) return res.sendStatus(401)

    const user = await db.collection("usuarios").findOne({_id: new ObjectId(sessoes.userId)})
    if(!user) return res.sendStatus(401)

    delete user.password
    res.status(200).send(user)
}
//app.get("/home", async(req,res)=>{
