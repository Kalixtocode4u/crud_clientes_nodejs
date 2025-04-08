module.exports = {
    type: "object",
    properties: {
        nome: {type: 'string'},
        codProduto: {type: 'integer'},
        descricao: {type: 'string'},
        precoUnitario: {type: 'number'},
        clienteId: {type: 'integer'},
        foto: {type: 'string'},
    },
    required: ["nome", "codProduto", "descricao", "precoUnitario", "clienteId"],
    additionalProperties: false
}