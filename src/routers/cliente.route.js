const express = require('express')
const router = express.Router()
const clienteMid = require('../middleware/cliente.middleware')
const clienteControl = require('../controllers/cliente.control')

// passando o middleware
router.post('/', clienteMid)

// chamadas da Api
router.get('/', clienteControl.getClienteList)           // get todo os clientes

router.get("/:id", clienteControl.getClienteById)        // get cliente por id

router.post('/', clienteControl.postCliente)             // post cliente

router.post("/editar/:id", clienteControl.putCliente)    // put cliente

router.get("/delete/:id", clienteControl.deleteCliente)  // delete cliente

//
router.post("/login", clienteControl.logar)

module.exports = router;