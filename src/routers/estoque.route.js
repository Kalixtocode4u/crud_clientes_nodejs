const express = require('express')
const router = express.Router()
const EstoqueControl = require('../controllers/estoque.control')

// Chamadas da Api
router.post("/", EstoqueControl.adicionarProduto)

router.get('/delete/:id', EstoqueControl.removerProduto)

module.exports = router