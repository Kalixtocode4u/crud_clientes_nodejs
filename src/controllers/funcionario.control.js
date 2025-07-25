const { Op } = require("sequelize");
const { Funcionario } = require("../db/models")
const bcrypt = require('bcrypt')
const jweb = require('jsonwebtoken')

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
            const {nome, email, senha, cargo, tipoDeAcesso} = req.body
            
            const sal = await bcrypt.genSalt(10)
            const senhacriptografada = await bcrypt.hash(senha, sal)
            
            const data = {nome: nome, email: email, senha: senhacriptografada, cargo: cargo, tipoDeAcesso: tipoDeAcesso}
            await Funcionario.create(data)

            res.redirect("/funcionario")
        }catch(err){
            res.status(500).send("msg: Falha interna para salvar o Funcionario")
        }
    }
    
    static async putFuncionario(req, res){
        const funcionario = await Funcionario.findByPk(req.params.id)
        if(funcionario){
            const {nome, email, senha, cargo, tipoDeAcesso} = req.body
            
            const sal = await bcrypt.genSalt(10)
            const senhacriptografada = await bcrypt.hash(senha, sal)
            
            funcionario.nome = nome
            funcionario.email = email
            funcionario.senha = senhacriptografada
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
            res.status(404).json({mensagem: "Funcionario não encontrado"})
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
            if(bcrypt.compare(senha, funcionario.senha)){
                
                const payload = {sub: funcionario.id, iss: 'crud-cliente', aud: 'crud', email: funcionario.email}
                const token = jweb.sign(payload, process.env.ACCESS_TOKEN, {expiresIn: '2h'})

                //localStorage.setItem()
                res.cookie("tokem", `bearer ${token}`, {expires: new Date(Date.now() + 1 * 3600000)})
                res.render("./view/mainpage", {layout: "userLayout.handlebars", accessToken: token})
            }else{
                res.status(403).json({msg: "Senha invalida"})
            }
        }else{
            res.status(404).json({msg: "Usuario não encontrado"})
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
            res.status(404).json({msg:"erro na pesquisa, Funcionario não encontrado"})
        }
    }

}

module.exports = FuncionarioControl;