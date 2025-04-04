const express = require('express')
const router = express.Router()
const ClienteControl = require('../controllers/cliente.control')
const ProdutoControl = require('../controllers/produto.control')


router.get("/", (req, res) => {
    res.render("./view/home", {layout: 'layout.handlebars'})
})

router.post('/home', ClienteControl.login)

/*
router.get("/*", (req, res) => {
    res.render("./view/notFound", {layout: 'layout.handlebars'})
})*/

router.get('/auth')

router.get('/login', ClienteControl.logar)
router.get('/cadastro', ClienteControl.cadastro)

// paginas dos clientes
router.get("/cliente", ClienteControl.pageCliente)

router.get("/cliente/criar", ClienteControl.criarCliente)

router.get("/cliente/editar/:id", ClienteControl.editarCliente)

router.get("/cliente/detalhes/:id", ClienteControl.detalhesCliente)

router.get('/cliente/search', ClienteControl.pesquisa)

// paginas do produtos
router.get("/produto", ProdutoControl.pageProduto)

router.get("/produto/criar", ProdutoControl.criarProduto)

router.get("/produto/editar/:id", ProdutoControl.editarProduto)

router.get("/produto/detalhes/:id", ProdutoControl.detalhesProduto)



module.exports = router;