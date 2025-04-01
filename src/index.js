/**
 * @author Kalixtocode4u
 * @
 */
const express = require("express")
const { engine } = require('express-handlebars')
const clienteRoute = require("./routers/cliente.route")
const indexRoute = require("./routers/index.route")
const app = express()
const bodyParser = require('body-parser')

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./views")

app.use(express.static('public'))

app.use("/api/cliente", clienteRoute)
app.use("/", indexRoute)

app.listen(5000, () => {
    console.log("Servidor aberto na porta 5000")
})

// npm i express
// npm i sequelize
// npm i mariadb
// npm i --save-dev sequelize-cli
// npm i --save-dev nodemon
// npm i ajv
// npm i ajv-formats
// npm i handlebars
// npm i body-parser

//npx sequelize-cli model:generate --name Cliente --attributes nome:string,email:string,senha:string,documento:string,telefone:string
//npx sequelize-cli db:migrate