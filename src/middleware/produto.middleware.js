const produtoSchema = require('../schema/produto.schema')
const Ajv = require('ajv')
const AjvFormats = require('ajv-formats')
const ajv = new Ajv()

AjvFormats(ajv)

function validarProduto(req, res, next){
    const data = req.body
    const validacao = ajv.compile(produtoSchema)
    const validar = validacao(data)
    if(validar){
        next()
    }else{
        res.status(400).json({mensagem: "Dados invalidos", erro: validacao.errors})
    }
}

module.exports = validarProduto;