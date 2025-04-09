const { Produto, estoque } = require('../db/models')

class EstoqueControl{
    static async estoque(req, res){
        const produtos = await estoque.findAll({include: {model: Produto}, raw: true})
        res.render("./view/estoque/estoque", {layout: 'userLayout.handlebars', produtos: produtos})
    }

    static async adicionarProduto(req, res){
        try{
            const data = req.body
            const produto = await estoque.create(data)
            res.redirect("/estoque")
        }catch(err){
            res.status(400).send("msg: Falha interna para adicionar o produto ao estoque\nerr: " + err)
        }
    }

    static async removerProduto(req, res) {
        const produto = await estoque.findByPk(req.params.id)
        if(produto){
            await produto.destroy()
            res.redirect("/estoque")
        }else{
            res.status(404).send("msg: Produto não encontrado")
        }
    }

    static async atualizarProduto(req, res){
        const produto = await estoque.findByPk(req.params.id)
        if(produto){
            const {idProduto, quantidade} = req.body
            produto.idProduto = idProduto
            produto.quantidade = quantidade
            await produto.save()
            res.redirect("/estoque")
        }else{
            res.status(404).send("msg: Produto não encontrado")
        }
    }

}

module.exports = EstoqueControl;