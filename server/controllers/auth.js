import { sql } from "../db.js"
import bcrypt from "bcryptjs"
import {generateAccessToken} from "../utils/generateToken.js"

export const auth = async (req, res) =>{

    const {email, password} = req.body

    const user = await sql`select * from Users where email = ${email}`

    if (!user[0]){
        return res.status(400).json({massege: `Пользователь ${email} не найден`})
    }

    const validPassword = bcrypt.compareSync(password, user[0].password)
    if (!validPassword){
        return res.status(400).json({massege: `Введен не верный пароль`})
    }

    const token = generateAccessToken(user[0].id, user[0].role)

    return res.json({
        token: token,
        user: user[0]
    })
}