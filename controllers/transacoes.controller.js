import { db } from "../database/database.connection.js"

export async function NovaTransacao(req, res){

    const { tipo } = req.params
    const { valor, descricao } = req.body

    try{
        if(tipo === "entrada"){
            await db.collection("transacoes").insertOne({
                valor,
                descricao,
                tipo,
                userId: res.locals.sessao.userId
            })
            return res.send("Criado entrada").status(200)
        }
        if(tipo === "saida"){
            await db.collection("transacoes").insertOne({
                valor, 
                descricao,
                tipo,
                userId: res.locals.sessao.userId
            })
            return res.send("Criado saida").status(200)
        }

        res.sendStatus(422)
    }
    catch(err){
        res.status(500).send(err.message)
    }

}

export async function home(req, res){
    try{

        const user = await db.collection("usuarios").findOne({_id: res.locals.sessao.userId})
        delete user.password
        const consulta = await db.collection("transacoes").find({userId: user._id}).toArray()
        res.status(200).send(consulta)
    }
    catch(err){
        res.send(err.message).status(500)
    }
}
