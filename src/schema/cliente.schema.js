module.exports = {
    type: "object",
    properties: {
        nome: {type: "string"},
        email: {type: "string", format: "email"},
        senha: {type: "string"},
        documento: {type: "string"},
        telefone: {type: "string"}
    },
    required: ["nome", "email", "senha", "documento", "telefone"],
    additionalProperties: false,
}