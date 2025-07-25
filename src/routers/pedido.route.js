const express = require('express')
const router = express.Router()
const PedidoControl = require('../controllers/pedido.control')
const PedidoMiddleware = require('../middleware/pedido.middleware')

// passando o middleware
router.post('/', PedidoMiddleware)

// chamadas da Api
router.get('/', PedidoControl.getPedidoList)

router.get('/:id', PedidoControl.getPedidoById)

router.post('/', PedidoControl.postPedido)

router.post("/editar/:id", PedidoControl.putPedido)

router.get("/delete/:id", PedidoControl.deletePedido)

module.exports = router;