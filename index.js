const express = require("express")
require("dotenv").config()
const app = express()
const cors = require("cors")
const { Sequelize } = require("sequelize")
const { DataTypes } = require("sequelize")


const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
)

const User = sequelize.define("users", {
    id_user: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    sex: { type: DataTypes.STRING }
}, { timestamps: false })


app.use(cors())
app.use(express.json())
app.get("/", (req, res) => {
    res.send("<h1>Hello world!</h1>")
})


async function start() {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(8080, () => {
        console.log(`Сервер работает на порту 8080`)
    })
}

start()