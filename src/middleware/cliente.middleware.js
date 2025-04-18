const clienteSchema = require('../schema/cliente.schema')
const Ajv = require('ajv')
const AjvFormats = require('ajv-formats')
const ajv = new Ajv()

AjvFormats(ajv)

function validarCliente(req, res, next){
    const data = req.body
    const validacao = ajv.compile(clienteSchema)
    const validar = validacao(data)
    if(validar){
        next()
    }else{
        res.status(400).json({mensagem: "Dados invalidos", erro: validacao.errors})
    }
}

module.exports = validarCliente;

