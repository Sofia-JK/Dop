import postgres from "postgres";

export const sql =postgres({
    host: 'Sofiya1523',
    port: 5432,
    db: 'dop_course',
    username: 'postgres',
    password: 'root'
})