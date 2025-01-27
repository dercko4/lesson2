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

app.get("/getUser/:id_user", async (req, res) => {
    try {
        const data = req.params
        const user = await User.findOne({ where: { id_user: data.id_user } })
        if (!user) return res.json("Запись не найдена!")
        res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Ошибка" })
    }
})


app.post("/insertUser", async (req, res) => {
    try {
        const data = req.body
        console.log(req.body)
        const newUser = await User.create({ surname: data.surname, number_group: data.number_group })
        res.json({ message: "Запись создана!" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Ошибка" })
    }
})

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