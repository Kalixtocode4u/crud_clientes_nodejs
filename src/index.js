/**
 * @author Kalixtocode4u
 * 
 */
const express = require("express")
const { engine } = require('express-handlebars')


const clienteRoute = require("./routers/cliente.route")
const produtoRoute = require("./routers/produto.route")
const funcionarioRoute = require("./routers/funcionario.route")
const estoqueRoute = require('./routers/estoque.route')
const pedidoRoute = require('./routers/pedido.route')
const indexRoute = require("./routers/index.route")

const app = express()
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.engine("handlebars", engine({
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
}))

app.set("view engine", "handlebars")
app.set("views", "./views")

app.use('/static', express.static('public'))

app.use("/api/cliente", clienteRoute)
app.use("/api/produto", produtoRoute)
app.use("/api/funcionario", funcionarioRoute)
app.use("/api/estoque", estoqueRoute)
app.use('/api/pedido', pedidoRoute)

app.use("/", indexRoute)

// Error Handler desativado por enquanto
/*app.use((err, req, res, next) => {
    const {statusCode, message} = err
    res.status(statusCode).render("./view/notFound", {layout: 'layout.handlebars', err: message})
})
*/


app.listen(5000)

