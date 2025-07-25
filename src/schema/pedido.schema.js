module.exports = {
    type: "object",
    properties: {
        data: {type: "date"},
        status: {type: "string"},
        produtos: {type: "string"},
        totalPedido: {type: "number"},
        clientId: {type: "integer"}
    },
    required: ['data', 'status', 'produto', 'idCliente'],
    additionalProperties: false
}