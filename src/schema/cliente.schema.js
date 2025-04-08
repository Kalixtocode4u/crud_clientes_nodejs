module.exports = {
    type: "object",
    properties: {
        nome: {type: "string"},
        nomeFantasia: {type: "string"},
        documento: {type: "string"},
        telefone: {type: "string"},
        tipoCliente: {type: "string"}
    },
    required: ["nome", "nomeFantasia", "documento", "telefone","tipoCliente"],
    additionalProperties: false,
}