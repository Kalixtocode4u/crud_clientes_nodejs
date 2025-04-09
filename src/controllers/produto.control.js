const { Op } = require('sequelize')
const { Produto } = require('../db/models')

const URL_PATH = process.env.URL_PATH || ''

//Metodos
function getFullPathFilename(filename){
    return `/static/uploads/${filename.filename}`
}

class ProdutoControl{

    static async postProduto(req, res){
        try{
            const data = req.body
            var foto
            if(req.file){
                data.foto = getFullPathFilename(req.file)
            }
            const produto = await Produto.create(data)
            res.redirect("/produto/detalhes/" + produto.id)
        }catch(err){
            res.status(400).send("msg: falha ao adicionar o produto\nerro: "+err)
        }
    }

    static async postProdutoImage(req, res){
        const produto = await Produto.findByPk(req.params.id)
        try{
            if(produto){
                produto.foto = getFullPathFilename(req.file)
                await produto.save()
                res.redirect("/produto")
            }else{
                res.status(400).send("msg: falha ao encontrar o produto")
            }
        }catch(err){
            res.status(500).send("msg: falha ao adicionar o produto\nerro: "+err)
        }
    }

    static async putProduto(req, res){
        const produto = await Produto.findByPk(req.params.id)
        if(produto){
            const { nome, codProduto, descricao, precoUnitario, quantidade, clienteId } = req.body
            produto.nome = nome
            produto.codProduto = codProduto
            produto.descricao = descricao
            produto.precoUnitario = precoUnitario
            produto.quantidade = quantidade
            produto.clienteId = clienteId
            await produto.save()
            res.redirect("/produto/detalhes/"+ produto.id)
            //res.json({mensagem: "produto atualiza com sucesso"})
        }else{
            res.status(400).json({mensagem: "falha em encontrar o produto o produto"})
        }
    }
    
    static async deleteProduto(req, res){
        const produto = await Produto.findByPk(req.params.id)
        if(produto){
            await produto.destroy()
            res.redirect("/produto")
            //res.json({mensagem: "produto deletado com sucesso"})
        }else{
            res.status(400).json({mensagem: "falha em encontrar o produto o produto"})
        }
    }
    
    // renderisação das paginas
    static async pageProduto(req, res){
        const produtos = await Produto.findAll({raw: true})
        res.render("./view/produtos/lista", {layout: 'userLayout.handlebars', produtos: produtos})
    }
    
    static async criarProduto(req, res){
        res.render("./view/produtos/criar", {layout: 'userLayout.handlebars'})
    }
    
    static async editarProduto(req, res){
        const produto = await Produto.findByPk(req.params.id, {raw: true})
        res.render("./view/produtos/editar", {layout: 'userLayout.handlebars', produto: produto})
    }

    //static async uploadProduto(req, res){
    //    const produto = await Produto.findByPk(req.params.id, {raw: true})
    //    res.render("./view/produtos/upload", {layout: 'userLayout.handlebars', produto: produto})
    //}
    
    static async detalhesProduto(req, res){
        const produto = await Produto.findByPk(req.params.id, {raw: true})
        res.render("./view/produtos/detalhes", {layout: 'userLayout.handlebars', produto: produto})
    }

    // logica do estoque
    static async estoque(req, res){
        const produtos = await Produto.findAll({where: { quantidade:{ [Op.gt]: 0}}})
        res.render("./view/estoque/estoque", {layout: 'userLayout.handlebars', produtos: produtos})
    }

}

module.exports = ProdutoControl