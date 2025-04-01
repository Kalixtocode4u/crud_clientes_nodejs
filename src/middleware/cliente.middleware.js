const Ajv = require('ajv')
const AjvFormats = require('ajv-formats')
const clienteSchema = require('../schema/cliente.schema')
const ajv = new Ajv()

AjvFormats(ajv)

function validarCliente(req, res, next){
    const cliente = req.body
    const validacao = ajv.compile(clienteSchema)
    const validar = validacao(cliente)
    if(validar){
        next()
    }else{
        res.status(400).json({mensagem: "Dados invalidos", erro: validacao.errors})
    }
}

module.exports = validarCliente;