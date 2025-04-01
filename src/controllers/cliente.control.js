const { Cliente } = require("../db/models")

class clienteControl{

    // Metodos de Requisão
    static async getClienteList(req, res) {
        const clientes = await Cliente.findAll();
        res.json(clientes)
    }

    static async getClienteById(req, res){
        console.log(req.params.id)
        const cliente = await Cliente.findByPk(req.params.id)
        if(cliente){
            res.json(cliente)
        }else{
            res.status(400).json({mensagem: "cliente não encontrado!"})
        }
    }

    static async postCliente(req, res){
        try{
            const data = req.body
            const cliente = await Cliente.create(data)
            res.json({mensagem: "cliente adicionado com sucesso", usuarioId: cliente.id})
        }catch(err){
            res.status(400).json({mensagem: "Falha interna para salvar o Cliente"})
        }
    }

    static async deleteCliente(req, res){
        const cliente = await Cliente.findByPk(req.params.id)
        if(cliente){
            await cliente.destroy()
            res.json({mensagem: "cliente deletado com sucesso"})
        }else{
            res.status(400).json({mensagem: "Falha em deletar o Cliente"})
        }
    }

    static async putCliente(req, res){
        const cliente = await Cliente.findByPk(req.params.id)
        if(cliente){
            const {nome, email, senha, documento, telefone} = req.body
            cliente.nome = nome
            cliente.email = email
            cliente.senha = senha
            cliente.documento = documento
            cliente.telefone = telefone
            await cliente.save()
            res.json({mensagem: "cliente Atualizado com sucesso"})
        }else{
            res.status(400).json({mensagem: "Falha em atualizar o Cliente"})
        }
    }
    
    // renderização das paginas
    static async pageCliente(req, res){
        const clientes = await Cliente.findAll({raw: true})
        res.render("./view/clientes/lista", {layout: 'layout.handlebars', clientes: clientes})
    }
    
    static async criarCliente(req, res){
        res.render("./view/clientes/criar", {layout: 'layout.handlebars'})
    }
    
    static async editarCliente(req, res){
        const cliente = await Cliente.findByPk(req.params.id, {raw: true})
        res.render("./view/clientes/editar", {layout: 'layout.handlebars', cliente: cliente})
    }
    
    static async detalhesCliente(req, res){
        const cliente = await Cliente.findByPk(req.params.id, {raw: true})
        res.render("./view/clientes/detalhes", {layout: 'layout.handlebars', cliente: cliente})
    }
}

module.exports = clienteControl;