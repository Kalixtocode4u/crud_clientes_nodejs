module.exports = {
    type: "object",
    properties: {
        nome: {type: "string"},
        email: {type: "string", format: "email"},
        senha: {type: "string"},
        cargo: {type: "string"},
        tipoDeAcesso: {type: "string"}
    },
    required: ["nome", "email", "senha", "cargo", "tipoDeAcesso"],
    additionalProperties: false,
}