import { sql } from "../db.js";
import bcrypt from "bcryptjs"

export const newPassword = async (req, res) =>{

    const {id, password, newPassword} = req.body

    const data = await sql `select * from Users where id = ${id}`

    const validPassword = bcrypt.compareSync(password, data[0].password)

    if(!validPassword){
        return res.status(400).json({message: "Введён не верный пароль"})
    }

    const hashPassword = bcrypt.hashSync(newPassword, 7)
    await sql `update Users set password = ${hashPassword} where id = ${id}`

    res.send({message: "Пароль успешно обновлён"})

}