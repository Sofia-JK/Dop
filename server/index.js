import express from "express";
import cors from 'cors'
import multer from "multer";
import path from "path";
import { sql } from "./db.js";
import { register} from "./controllers/register.js"
import {auth} from "./controllers/auth.js"
import {newPassword} from "./controllers/newPassword.js"
import bcrypt from "bcryptjs"
import { roleMiddleware } from "./middlewares/roleMiddleware.js";

const PORT = 3000

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('uploads'))

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/uploads/')
    },
    filename: function (req, file, cb) {
        file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf-8')
        cb(null, file.originalname)},
    filenames: function (req, files, cb) {
        files.originalname = ArrayBuffer.from(files.originalname, 'latin1').toString('utf-8')
        cb(null, files.originalname)}
})

var upload = multer({storage: storage})

app.post('/reg', register)

app.post('/addCourses/', upload.fields([{ name: 'mediaVideo', maxCount: 1 }, { name: 'mediaImg_diplom', maxCount: 1 }, { name: 'mediaImg_index', maxCount: 1 }, { name: 'mediaImg_index2', maxCount: 1 }]), async(req, res) => {
    const mediaVideo = req.files['mediaVideo'][0].filename
    const mediaImg_diplom = req.files['mediaImg_diplom'][0].filename
    const mediaImg_index = req.files['mediaImg_index'][0].filename
    const mediaImg_index2 = req.files['mediaImg_index2'][0].filename
    const {name, info, name_video, details, time, info_diplom, price, info_price} = req.body
    console.log(mediaVideo)
    console.log(mediaImg_diplom)
    console.log(mediaImg_index)
    console.log(mediaImg_index2)
    await sql`insert into Courses(name, info, name_video, details, time, info_diplom, price, info_price) values(${name}, ${info}, ${name_video}, ${details}, ${time}, ${info_diplom}, ${price}, ${info_price})`
    await sql`insert into Media(name, video, img_diplom, img_index, img_index2) values(${name}, ${mediaVideo}, ${mediaImg_diplom}, ${mediaImg_index}, ${mediaImg_index2}})`  
    res.sendStatus(200)
})

app.post('/auth', auth)
app.post('/newPassword', newPassword)

app.post('/addLecturer', upload.single('mediaImg'), async(req, res) => {
    const mediaImg = req.file.filename
    const {fio, email, password} = req.body
    const hashPassword = bcrypt.hashSync(password, 7)
    const userRole = await sql`select * from Roles where role = 'LECTURER'`
    await sql`insert into Users(fio, email, password, role, img) values(${fio}, ${email}, ${hashPassword}, ${userRole[0].role}, ${mediaImg}})`
    res.sendStatus(200)
})

app.post('/addImg', upload.single('mediaImg'), async(req, res) => {
    const {id} = req.body
    const mediaImg = req.file.filename
    await sql`update Users set img = ${mediaImg} where id = ${id}`
    res.sendStatus(200)
})

app.post('/addRequests/', async(req, res) => {
    const {phone, id, dir} = req.body  
    await sql`insert into Requests(phone, status, user_id, course_id) values(${phone}, 'Ожидает', ${id}, ${dir})`
    res.sendStatus(200)
})

app.post('/yes/', async(req, res) => {
    const {id} = req.body;
    const data = await sql`update Requests set status = 'Одобрено' where id = ${id}`
    res.send({message: 'Заявка принята'})
})

app.post('/no/', async(req, res) => {
    const {id} = req.body;
    const data = await sql`delete from Requests where id = ${id}`
    res.send({message: 'Заявка отклонена'})
})

app.post('/attachLectorer', async(req, res) => {
    const {id, course_id} = req.body;
    await sql`insert into Attach(course_id, user_id) values(${course_id}, ${id})`
    res.send({message: 'Преподаватель успешно прикеплён'})
})

app.post('/addHomework', upload.fields([{ name: 'mediaVideo', maxCount: 1 }, { name: 'mediaFile', maxCount: 1 }]), async(req, res) => {
    const mediaVideo = req.files['mediaVideo']?.[0]?.filename
    const mediaFile = req.files['mediaFile']?.[0]?.filename
    const {topic, about, course, id} = req.body
    console.log(mediaVideo)
    console.log(mediaFile)

    await sql`insert into Homework(topic, about, video, file, course_id, user_id) values(${topic}, ${about}, ${mediaVideo ? `${mediaVideo}` : null}, ${mediaFile ? `${mediaFile}` : null}, ${course}, ${id})`  
    res.sendStatus(200)
})

app.post('/addAnswer', upload.fields([{ name: 'mediaFile', maxCount: 1 }]), async(req, res) => {
    const mediaFile = req.files['mediaFile']?.[0]?.filename
    const {comment, id, homework_id} = req.body
    console.log(mediaFile)
    await sql`insert into Answer(comment, file, homework_id, user_id) values(${comment == undefined ?  null : comment}, ${mediaFile ? `${mediaFile}` : null}, ${homework_id}, ${id})`  
    res.sendStatus(200)
})




app.get('/', roleMiddleware(["ADMIN"]), async (req, res) => {
    const data = await sql`select * from Users`
    res.send(data)
})

app.get('/curseID/', async(req, res) => {
    const data = await sql `select * from Courses`
    res.send(data)
})

app.get('/lectorer/', async(req, res) =>{
    const data = await sql `select * from Users`
    res.send(data)
})

app.get('/user/', async(req, res) =>{
    const data = await sql `select * from Users`
    res.send(data)
})

app.get('/media/', async(req, res) =>{
    const data = await sql `select * from Media`
    res.send(data)
})

app.get('/requests/', async(req, res) =>{
    const data = await sql `select * from Requests`
    res.send(data)
})

app.get('/attach/', async(req, res) =>{
    const data = await sql `select * from Attach`
    res.send(data)
})

app.get('/homework/', async(req, res) =>{
    const data = await sql `select * from Homework`
    res.send(data)
})

app.get('/answer/', async(req, res) =>{
    const data = await sql `select * from Answer`
    res.send(data)
})



const start = async () => {

    /*await sql `create table if not exists Roles(
        role varchar(100) unique primary key
    )`

    await sql `create table if not exists Courses(
        id SERIAL PRIMARY KEY NOT NULL,
        name varchar(100) unique NOT NULL,
        info varchar(100) NOT NULL,
        name_video varchar(100) NOT NULL,
        details varchar(200) NOT NULL,
        time varchar(10) NOT NULL,
        price varchar(100),
        info_price varchar(100),
        info_diplom varchar(200) NOT NULL
    )`

    await sql `create table if not exists Media(
        id SERIAL PRIMARY KEY NOT NULL,
        name varchar(100) NOT NULL,
        video varchar(600) NOT NULL,
        img_diplom varchar(600) NOT NULL,
        img_index varchar(600) NOT NULL,
        img_index2 varchar(600) NOT NULL,
        FOREIGN KEY (name) REFERENCES Courses(name)
    )`

    await sql `create table if not exists Users(
        id SERIAL PRIMARY KEY NOT NULL,
        fio varchar(100) NOT NULL,
        email varchar(100) NOT NULL,
        password varchar(100),
        img varchar(500),
        role varchar(100),
        course_id integer,
        FOREIGN KEY (role) REFERENCES Roles(role),
        FOREIGN KEY (course_id) REFERENCES Courses(id)
    )`

    await sql `create table if not exists Requests(
        id SERIAL PRIMARY KEY NOT NULL,
        phone bigint NOT NULL,
        status varchar(100) NOT NULL,
        user_id integer,
        course_id integer,
        FOREIGN KEY (user_id) REFERENCES Users(id),
        FOREIGN KEY (course_id) REFERENCES Courses(id)
    )`

    await sql `create table if not exists Attach(
        id SERIAL PRIMARY KEY NOT NULL,
        course_id int,
        user_id int,
        FOREIGN KEY(course_id) REFERENCES Courses(id),
        FOREIGN KEY(user_id) REFERENCES Users(id)
    )`

        await sql `create table if not exists Homework(
        id SERIAL PRIMARY KEY NOT NULL,
        topic varchar(100) NOT NULL,
        about varchar(100) NOT NULL,
        video varchar(600),
        file varchar(600),
        course_id int,
        user_id int,
        FOREIGN KEY(course_id) REFERENCES Courses(id),
        FOREIGN KEY(user_id) REFERENCES Users(id)
    )`

    await sql `create table if not exists Answer(
        id SERIAL PRIMARY KEY NOT NULL,
        comment varchar(100),
        file varchar(600),
        homework_id int,
        user_id int,
        FOREIGN KEY(homework_id) REFERENCES Homework(id),
        FOREIGN KEY(user_id) REFERENCES Users(id)
    )`
    

    await sql`insert into Roles(role) values('ADMIN')`
    await sql`insert into Roles(role) values('STUDENT')`
    await sql`insert into Roles(role) values('LECTURER')`*/



    
    app.listen(PORT, () => {
        console.log (`СЕРВЕР РАБОТАЕТ ТУТ: http://localhost:${PORT}`);
    })
}

start()

