const { Produto } = require('../db/models')

const URL_PATH = process.env.URL_PATH || ''

//Metodos
function getFullPathFilename(filename){
    return `${URL_PATH}/static/uploads/${filename.filename}`
}

class ProdutoControl{

    // chamadas da api
    static async getProdutoList(req, res){
        const produtos = await Produto.findAll()
        res.json({produtos: produtos})
    }

    static async getProdutoById(req, res){
        const produto = await Produto.findBypk(req.params.id)
        if(produto){
            res.json({produto: produto})
        }
    }

    static async postProduto(req, res){
        try{
            const data = req.body
            if(req.file){
                data.foto = getFullPathFilename(req.file)
            }
            const produto = await Produto.create(data)
            res.redirect("/produto/detalhes/" + produto.id)
            //res.json({produto: produto})
        }catch(err){
            res.status(400).send("msg: falha ao adicionar o produto\nerro: "+err)
        }
    }

    static async postProdutoImage(req, res){
        const produto = await Produto.findByPk(req.params,id)
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
            const { nome, codProduto, descricao, precoUnitario, quantidade } = req.body
            produto.nome = nome
            produto.codProduto = codProduto
            produto.descricao = descricao
            produto.precoUnitario = precoUnitario
            produto.quantidade = quantidade
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
        res.render("./view/produtos/lista", {layout: 'userlayout.handlebars', produtos: produtos})
    }
    
    static async criarProduto(req, res){
        res.render("./view/produtos/criar", {layout: 'userlayout.handlebars'})
    }
    
    static async editarProduto(req, res){
        const produto = await Produto.findByPk(req.params.id, {raw: true})
        res.render("./view/produtos/editar", {layout: 'userlayout.handlebars', produto: produto})
    }
    
    static async detalhesProduto(req, res){
        const produto = await Produto.findByPk(req.params.id, {raw: true})
        res.render("./view/produtos/detalhes", {layout: 'userlayout.handlebars', produto: produto})
    }

}

module.exports = ProdutoControl