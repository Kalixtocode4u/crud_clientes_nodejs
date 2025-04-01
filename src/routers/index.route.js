const express = require('express')
const router = express.Router()
const clienteControl = require('../controllers/cliente.control')


router.get("/", (req, res) => {
    res.render("./view/home", {layout: 'layout.handlebars'})
})

router.get("/cliente", clienteControl.pageCliente)

router.get("/cliente/criar", clienteControl.criarCliente)

router.get("/cliente/editar/:id", clienteControl.editarCliente)

router.get("/cliente/detalhes/:id", clienteControl.detalhesCliente)

/*router.get("/*", (req, res) => {
    res.render("./view/notFound", {layout: 'layout.handlebars'})
})*/


module.exports = router;