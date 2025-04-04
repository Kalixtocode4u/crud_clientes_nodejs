/**
 * @author Kalixtocode4u
 * @
 */
const express = require("express")
const { engine } = require('express-handlebars')
const clienteRoute = require("./routers/cliente.route")
const produtoRoute = require("./routers/produto.route")
const indexRoute = require("./routers/index.route")
const app = express()
const bodyParser = require('body-parser')

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.engine("handlebars", engine({
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
}))
app.set("view engine", "handlebars")
app.set("views", "./views")

app.use('/static', express.static('public'))

app.use("/api/cliente", clienteRoute)
app.use("/api/produto", produtoRoute)
app.use("/", indexRoute)

app.listen(5000, () => {
    console.log("Servidor aberto na porta 5000")
})

