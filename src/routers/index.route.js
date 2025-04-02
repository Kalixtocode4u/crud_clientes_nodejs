const express = require('express')
const router = express.Router()
const clienteControl = require('../controllers/cliente.control')


router.get("/", (req, res) => {
    res.render("./view/home", {layout: 'layout.handlebars'})
})

router.get('/login', clienteControl.login)
router.get('/cadastro', clienteControl.cadastro)


router.get("/cliente", clienteControl.pageCliente)

router.get("/cliente/criar", clienteControl.criarCliente)

router.get("/cliente/editar/:id", clienteControl.editarCliente)

router.get("/cliente/detalhes/:id", clienteControl.detalhesCliente)

router.get('/cliente/search', clienteControl.pesquisa)

/*router.get("/*", (req, res) => {
    res.render("./view/notFound", {layout: 'layout.handlebars'})
})*/


module.exports = router;