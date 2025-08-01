const express = require('express')
const router = express.Router()
const ClienteControl = require('../controllers/cliente.control')
const ProdutoControl = require('../controllers/produto.control')
const FuncionarioControl = require('../controllers/funcionario.control')
const EstoqueControl = require('../controllers/estoque.control')
const PedidoControl = require('../controllers/pedido.control')


router.get("/", (req, res) => {
    res.render("./view/home", {layout: 'layout.handlebars'})
})

router.get("/teste", (req, res) => {
    res.render("./view/teste", {layout: 'layout.handlebars'})
})

router.post('/home', FuncionarioControl.login)

// paginas de login
router.get('/login', FuncionarioControl.logar)
router.get('/cadastro', FuncionarioControl.cadastro)

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

// pagina de estoque
router.get('/estoque', EstoqueControl.estoque)

// pagina do funcionarios
router.get("/funcionario", FuncionarioControl.pageFuncionario)

router.get("/funcionario/criar", FuncionarioControl.criarFuncionario)

router.get("/funcionario/editar/:id", FuncionarioControl.editarFuncionario)

router.get("/funcionario/detalhes/:id", FuncionarioControl.detalhesFuncionario)

// pagina do Pedido

router.get("/pedido", PedidoControl.pagePedido)

router.get("/pedido/criar", PedidoControl.criarPedido)

router.get("/pedido/editar/:id", PedidoControl.editarPedido)

router.get("/pedido/detalhes/:id", PedidoControl.detalhePedido)

module.exports = router;