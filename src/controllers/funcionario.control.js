const { Op } = require("sequelize");
const { Funcionario } = require("../db/models")

class FuncionarioControl{

    // Metodos de Requisão
    static async getFuncionarioList(req, res) {
        const funcionarios = await Funcionario.findAll();
        res.json(funcionarios)
    }

    static async getFuncionarioById(req, res){
        const funcionario = await Funcionario.findByPk(req.params.id)
        if(funcionario){
            res.json({funcionario: funcionario})
        }else{
            res.status(400).json({mensagem: "funcionario não encontrado!"})
        }
    }

    static async postFuncionario(req, res){
        try{
            const data = req.body
            const funcionario = await Funcionario.create(data)
            res.redirect("/")
            //res.json({mensagem: "funcionario cadastrado com sucesso com sucesso", usuarioId: funcionario.id})
        }catch(err){
            res.status(400).send("msg: Falha interna para salvar o Funcionario")
        }
    }
    
    static async putFuncionario(req, res){
        const funcionario = await Funcionario.findByPk(req.params.id)
        if(funcionario){
            const {nome, email, senha, cargo, tipoDeAcesso} = req.body
            funcionario.nome = nome
            funcionario.email = email
            funcionario.senha = senha
            funcionario.cargo = cargo
            funcionario.tipoDeAcesso = tipoDeAcesso
            await funcionario.save()
            res.redirect('/funcionario')
            //res.json({mensagem: "funcionario Atualizado com sucesso"})
        }else{
            res.status(400).json({mensagem: "Falha em atualizar o Funcionario"})
        }
    }

    static async deleteFuncionario(req, res){
        const funcionario = await Funcionario.findByPk(req.params.id)
        if(funcionario){
            await funcionario.destroy()
            res.redirect('/funcionario')
            //res.json({mensagem: "funcionario deletado com sucesso"})
        }else{
            res.status(400).json({mensagem: "Falha em deletar o Funcionario"})
        }
    }
    
    // renderização das paginas
    static async pageFuncionario(req, res){
        const funcionarios = await Funcionario.findAll({raw: true})
        res.render("./view/funcionarios/lista", {layout: 'userlayout.handlebars', funcionarios: funcionarios})
    }
    
    static async criarFuncionario(req, res){
        res.render("./view/funcionarios/criar", {layout: 'userlayout.handlebars'})
    }
    
    static async editarFuncionario(req, res){
        const funcionario = await Funcionario.findByPk(req.params.id, {raw: true})
        res.render("./view/funcionarios/editar", {layout: 'userlayout.handlebars', funcionario: funcionario})
    }
    
    static async detalhesFuncionario(req, res){
        const funcionario = await Funcionario.findByPk(req.params.id, {raw: true})
        res.render("./view/funcionarios/detalhes", {layout: 'userlayout.handlebars', funcionario: funcionario})
    }

    // outras requisições
    static async logar(req, res) {
        res.render("./view/login", {layout: 'layout.handlebars'})
    }

    static async login(req, res){
        const {email, senha} = req.body
        const funcionario = await Funcionario.findOne({where: {email: email}, raw: true})
        if(funcionario){
            if(senha === funcionario.senha){
                res.render("./view/mainpage", {layout: "userLayout.handlebars", funcionario: funcionario})
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

        const funcionarios = await Funcionario.findAll({ where: { nome: {[Op.like]: `%${nome}%`} }, raw: true })
        if(funcionarios){
            //res.status(200).json({funcionarios: funcionarios})
            res.render("./view/funcionarios/lista", {layout: 'layout.handlebars', funcionarios})
        }else{
            res.status(400).json({msg:"erro na pesquisa, Funcionario não encontrado"})
        }
    }

}

module.exports = FuncionarioControl;