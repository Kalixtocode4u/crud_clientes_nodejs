const express = require('express')
const router = express.Router()
const FuncionarioControl = require('../controllers/funcionario.control')
const FuncionarioMiddleware = require('../middleware/funcionario.middleware')

// passando o middleware
router.post('/', FuncionarioMiddleware)

// chamadas da Api
router.get('/', FuncionarioControl.getFuncionarioList)           // get todo os clientes

router.get("/:id", FuncionarioControl.getFuncionarioById)        // get cliente por id

router.post('/', FuncionarioControl.postFuncionario)             // post cliente

router.post("/editar/:id", FuncionarioControl.putFuncionario)    // put cliente
//router.put("/", ClienteControl.putCliente)

router.get("/delete/:id", FuncionarioControl.deleteFuncionario)  // delete cliente
//router.delete('/', ClienteControl.deleteCliente)

//
//router.post("/login", ClienteControl.login)

module.exports = router;