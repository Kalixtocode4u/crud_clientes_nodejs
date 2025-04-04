const express = require('express')
const router = express.Router()
const ClienteControl = require('../controllers/cliente.control')
const ClienteMiddleware = require('../middleware/cliente.middleware')

// passando o middleware
router.post('/', ClienteMiddleware)

// chamadas da Api
router.get('/', ClienteControl.getClienteList)           // get todo os clientes

router.get("/:id", ClienteControl.getClienteById)        // get cliente por id

router.post('/', ClienteControl.postCliente)             // post cliente

router.post("/editar/:id", ClienteControl.putCliente)    // put cliente
//router.put("/", ClienteControl.putCliente)

router.get("/delete/:id", ClienteControl.deleteCliente)  // delete cliente
//router.delete('/', ClienteControl.deleteCliente)

//
//router.post("/login", ClienteControl.login)

module.exports = router;