module.exports = {
    type: "object",
    properties: {
        nome: {type: "string"},
        nomefantasia: {type: "string"},
        documento: {type: "string"},
        telefone: {type: "string"},
        endereco: {type: "string"},
        tipoCliente: {type: "string"}
    },
    required: ["nome", "nomefantasia", "documento", "telefone", "endereco", "tipoCliente"],
    additionalProperties: false,
}