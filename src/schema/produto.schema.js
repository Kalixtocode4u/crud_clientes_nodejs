module.exports = {
    type: "object",
    properties: {
        nome: {type: 'string'},
        codProduto: {type: 'integer'},
        descricao: {type: 'string'},
        precoUnitario: {type: 'decimal'},
        quantidade: {type: 'integer'}
    },
    required: ["nome", "codProduto", "descricao", "precoUnitario", "quantidade"],
    additionalProperties: false
}