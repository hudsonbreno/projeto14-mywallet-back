import { db } from "../database/database.connection.js"

export async function authValidation(req, res, next){
    const { authorization } = req.headers
    console.log(authorization)
    const token = authorization?.replace("Bearer ", "")
    console.log(token)
    if(!token) return res.sendStatus(401)

    try{
        console.log(token)
        const sessao = await db.collection("sessoes").findOne({token:token})
        if(!sessao) return res.sendStatus(401)
        
        res.locals.sessao = sessao

        next()
    }
    catch(err){
        res.status(500).send(err.message)
    }
}