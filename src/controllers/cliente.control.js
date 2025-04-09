const { Op } = require("sequelize");
const { Cliente } = require("../db/models")

class ClienteControl{

    // Metodos de Requisão
    static async getClienteList(req, res) {
        const clientes = await Cliente.findAll();
        res.json(clientes)
    }

    static async getClienteById(req, res){
        const cliente = await Cliente.findByPk(req.params.id)
        if(cliente){
            res.json({cliente: cliente})
        }else{
            res.status(400).json({mensagem: "cliente não encontrado!"})
        }
    }

    static async postCliente(req, res){
        try{
            const data = req.body
            const cliente = await Cliente.create(data)
            res.redirect("/")
            //res.json({mensagem: "cliente cadastrado com sucesso com sucesso", usuarioId: cliente.id})
        }catch(err){
            res.status(400).send("msg: Falha interna para salvar o Cliente\nerr: " + err)
        }
    }
    
    static async putCliente(req, res){
        const cliente = await Cliente.findByPk(req.params.id)
        if(cliente){
            const {nome, nomefantasia, documento, telefone, endereco, tipoCliente} = req.body
            cliente.nome = nome
            cliente.nomefantasia = nomefantasia
            cliente.documento = documento
            cliente.telefone = telefone
            cliente.endereco = endereco
            cliente.tipoCliente = tipoCliente
            await cliente.save()
            res.redirect('/cliente')
            //res.json({mensagem: "cliente Atualizado com sucesso"})
        }else{
            res.status(404).json({mensagem: "Cliente não encontrado"})
        }
    }

    static async deleteCliente(req, res){
        const cliente = await Cliente.findByPk(req.params.id)
        if(cliente){
            await cliente.destroy()
            res.redirect('/cliente')
            //res.json({mensagem: "cliente deletado com sucesso"})
        }else{
            res.status(404).send("msg: Cliente Não Encontrado")
        }
    }
    
    // renderização das paginas
    static async pageCliente(req, res){
        const clientes = await Cliente.findAll({raw: true})
        res.render("./view/clientes/lista", {layout: 'userlayout.handlebars', clientes: clientes})
    }
    
    static async criarCliente(req, res){
        res.render("./view/clientes/criar", {layout: 'userlayout.handlebars'})
    }
    
    static async editarCliente(req, res){
        const cliente = await Cliente.findByPk(req.params.id, {raw: true})
        res.render("./view/clientes/editar", {layout: 'userlayout.handlebars', cliente: cliente})
    }
    
    static async detalhesCliente(req, res){
        const cliente = await Cliente.findByPk(req.params.id, {raw: true})
        res.render("./view/clientes/detalhes", {layout: 'userlayout.handlebars', cliente: cliente})
    }

    // outras requisições
    static async logar(req, res) {
        res.render("./view/login", {layout: 'layout.handlebars'})
    }

    static async login(req, res){
        const {email, senha} = req.body
        const cliente = await Cliente.findOne({where: {email: email}, raw: true})
        if(cliente){
            if(senha === cliente.senha){
                res.render("./view/mainpage", {layout: "userLayout.handlebars", cliente: cliente})
            }else{
                res.status(400).json({msg: "Senha invalida"})
            }
        }else{
            res.status(500).json({msg: "Erro do login, Usuario não encontrado"})
        }
    }

    static async cadastro(req, res){
        res.render("./view/cadastro", {layout: 'layout.handlebars'})
    }

    static async pesquisa(req,res){
        const nome = req.query.nome.replace(' ', '%')

        const clientes = await Cliente.findAll({ where: { nome: {[Op.like]: `%${nome}%`} }, raw: true })
        if(clientes){
            //res.status(200).json({clientes: clientes})
            res.render("./view/clientes/lista", {layout: 'layout.handlebars', clientes})
        }else{
            res.status(400).json({msg:"erro na pesquisa, Cliente não encontrado"})
        }
    }

}

module.exports = ClienteControl;