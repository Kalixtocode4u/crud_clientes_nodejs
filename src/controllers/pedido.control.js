const { Pedido } = require('../db/models')

class PedidoControl{
    static async getPedidoList(req, res){
        const pedidos = await Pedido.findAll()
        res.json({pedidos: pedidos})
    }

    static async getPedidoById(req, res){
        const pedido = await Pedido.findByPk(req.params.id)
        if(pedido){
            res.json({pedido: pedido})
        }else{
            res.status(404).send("msg: Pedido Não Encontrado")
        }
    }

    static async postPedido(req, res){
        const data = req.body;
        try{
            /*const pedido =*/ await Pedido.create(data)
            res.redirect("/pedido")
            //res.json({msg: "Pedido criado com sucesso", pedido: pedido})
        }catch(err){
            res.status(500).send("msg: Falha interna em criar o pedido")
        }
    }

    static async putPedido(req, res){
        const pedido = await Pedido.findByPk(req.params.id)
        if(pedido){
            const { data, status, produtos, totalPedido} = req.body
            pedido.data = data
            pedido.status = status
            pedido.produtos = produtos
            pedido.totalPedido = totalPedido
            await pedido.save()
            res.redirect('/pedido')
        }else{
            res.status(404).send("msg: Pedido não encontrado")
        }
    }

    static async deletePedido(req, res){
        const pedido = await Pedido.findByPk(req.params.id)
        if(pedido){
            await pedido.destroy()
            res.redirect('/pedido')
        }else{
            res.status(404).send("msg: Pedido não encontrado")
        }
    }

    // Renderização das paginas
    static async pagePedido(req, res){
        const pedidos = await Pedido.findAll()
        res.render("./view/pedidos/lista", {layout: "userLayout.handlebars", pedidos: pedidos})
    }

    static async detalhePedido(req, res){
        const pedido = await Pedido.findByPk(req.params.id, {raw: true})
        if(pedido){
            res.render("./view/pedidos/detalhe", {layout: "userLayout.handlebars", pedido: pedido})
        }else{
            res.status(404).send("msg: Pedido não encontrado")
        }
    }

    static async criarPedido(req, res){
        res.render("./view/pedidos/criar", {layout: "userLayout.handlebars"})
    }

    static async editarPedido(req, res){
        const pedido = await Pedido.findByPk(req.params.id, {raw: true})
        if(pedido){
            res.render("./view/pedidos/editar", {layout: "userLayout.handlebars", pedido: pedido})
        }else{
            res.status(404).send("msg: Pedido não encontrado")
        }
    }

}

module.exports = PedidoControl