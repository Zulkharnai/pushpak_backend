require('dotenv').config();
module.exports = {
    port: process.env.PORT,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    user: process.env.DB_USER,
    url: process.env.URL,
    development: {
        client: "mysql",
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: "",
            database: process.env.DB_NAME,
        },
        migrations: {
            directory: "./../migrations",
        }
    }
}