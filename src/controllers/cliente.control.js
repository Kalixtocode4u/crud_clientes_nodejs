const { where, Op } = require("sequelize");
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
            res.redirect("/")
            //res.json({mensagem: "cliente cadastrado com sucesso com sucesso", usuarioId: cliente.id})
        }catch(err){
            res.status(400).json({mensagem: "Falha interna para salvar o Cliente"})
        }
    }

    static async deleteCliente(req, res){
        const cliente = await Cliente.findByPk(req.params.id)
        if(cliente){
            await cliente.destroy()
            res.redirect('/cliente')
            //res.json({mensagem: "cliente deletado com sucesso"})
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
            res.redirect('/cliente')
            //res.json({mensagem: "cliente Atualizado com sucesso"})
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

    // outras requisições
    static async login(req, res) {
        res.render("./view/login", {layout: 'layout.handlebars'})
    }

    static async logar(req, res){
        const {email, senha} = req.body
        const cliente = await Cliente.findOne({attributes: ['email','senha'], where: {email: email}})
        if(cliente){
            if(senha === cliente.senha){
                res.redirect("/cliente")
            }else{
                res.status(400).json({msg: "Senha invalida"})
            }
        }else{
            res.status(500).json({msg: "Falha do servidor"})
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
            res.status(400).json({msg:"erro na pesquisa"})
        }
    }

}

module.exports = clienteControl;