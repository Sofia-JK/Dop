import { sql } from "../db.js";
import bcrypt from "bcryptjs"

export const register = async (req, res) =>{

    const {fio, email, password} = req.body;

    const candidate = await sql`select * from Users where email = ${email} limit 1`[0]

    if (candidate) {
        res.status(400).send("Пользователь уже существует")
    }

    console.log(req.body);
    const hashPassword = bcrypt.hashSync(password, 7)

    const userRole = await sql`select * from Roles where role = 'STUDENT'`

    await sql`insert into Users(fio, email, password, role) values(${fio}, ${email}, ${hashPassword}, ${userRole[0].role})`
    return res.send({message: "Пользователь успешно зарегистрирован"})
}