/**
 * @author Kalixtocode4u
 * 
 */
const express = require("express")
const { engine } = require('express-handlebars')
const clienteRoute = require("./routers/cliente.route")
const produtoRoute = require("./routers/produto.route")
const funcionarioRoute = require("./routers/funcionario.route")
const estoqueRoute = require('./routers/estoque.route')
const indexRoute = require("./routers/index.route")
const app = express()
const bodyParser = require('body-parser')

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.engine("handlebars", engine({
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
}))

app.set("view engine", "handlebars")
app.set("views", "./views")

app.use('/static', express.static('public'))

app.use("/api/cliente", clienteRoute)
app.use("/api/produto", produtoRoute)
app.use("/api/funcionario", funcionarioRoute)
app.use("/api/estoque", estoqueRoute)

app.use("/", indexRoute)

// Error Handler desativado por enquanto
//app.use(function(err, req, res, next){
//    res.status(500)
//    res.render("./view/notFound", {layout: 'layout.handlebars', err: err.message})
//})

app.listen(5000, () => {
    console.log("Servidor aberto na porta 5000")
})


// npm i bcrypt

// npm sequelize-cli init

// CLIENTE
// npx sequelize-cli model:generate --name Cliente --attributes nome:string,nomefantasia:string,documento:string,telefone:string,endereco:string,tipoCliente:string
// um cliente pode ser um fonecerdor, ditribuidora, mercado, tambem pode ser um usuario do sistema

// PRODUTO
// npx sequelize-cli model:generate --name Produto --attributes nome:string,codProduto:integer,descricao:string,precoUnitario:decimal,clienteId:integer,foto:string
// um produto pode ter varios fornecedores ou ligado a um fornecedor

// npx sequelize-cli db:migrate

// FUNCIONARIO
// npx sequelize-cli model:generate --name Funcionario --attributes nome:string,email:string,senha:string,cargo:string,tipoDeAcesso:string
// trocar tipo de acesso para nivel de acesso                                                                          nivelDeAcesso:string
// os funcionarios serão os usuarios do sistema, cada cargo do funcionario pode tipo de acesso diferente do sistema
// por exemplo odiretor geral pode ter total acesso do sistema, o Encarregado do setor so pode ver os produtos do estoque assim por diante

// VENDA
// npx sequelize-cli model:generate --name vendas --attributes idPedido:integer,impostos:decimal,margem:decimal,total:decimal
// relatorios

// ESTOQUE
// npx sequelize-cli model:generate --name estoque --attributes idProduto:integer,quantidade:integer

// PEDIDO
// npx sequelize-cli model:generate --name Pedido --attributes data:date,status:string,produtos:list,totalPedido:decimal
// preciso pensar sobre como fazer a lista de produtos do pedido

// LISTA DE PRODUTOS DO PEDIDO
// npx sequelize-cli model:generate --name listaProdutos --attributes idPedido:integer,idProduto:integer

/* 
 * atibutos de liberação de acessos
 * proximos passos criptografar as senhas
 * fazer um json tokem para liberação o acesso ao sistema
 * 
 * repensar o uso da tecnologia:
 *  node js pode ser até bom para sites e sistemas web
 *  entretanto devesse pensar do lado do servidor
 *  porque? fazer um aplicação com renderização do lado do
 *  servidor pode dar muita carga ao servidor.
 *  nenuhum problema com node ou javascript
 *  Porem pode ter ploblemas com a documnetação
 *  isso pode ficar algo muito mastigado
 * 
 * Automação o que se trata isso o que podemos acresentar de automação do sistema
 * 
 * Analisando...
 *  um sistema erp compoe de estoque dos produto, financeiro, vendas, logistica, contabilidade
 *  tambem pensar das regras de negocio
 *  ! Sistema de notoficações
 * 
 * usuarios:
 *  funcionarios:
 *      nivel operacinal:
 *          Vendedor
 *          operadores
 *          estoquistas
 *          conferente de estoque
 *          encarregados
 *          Assistentes
 *          Auxiliar armazem
 *          Auxiliar de vendas
 *          Auxiliar de logistica
 *          Atendentes
 *          Motorista
 *      nivel Tatico:
 *          Analistas de compra
 *          Analista de inventario
 *          Coodenador de distribuição
 *          supervisor de vendas
 *          gerentes
 *      nivel estrtegico:
 *          Gerente geral
 *          diretor de operações
 *          diretor comercial
 *          diretor finaceiro e controladoria
 *          diretor logistico
 *          CEO
 * 
 * financeiro: 
 *  notas fiscais de serviço eletronico
 *  boletos
 *  meios de pagamento
 * 
 * estoque:
 *  produtos
 *  funcionarios
 * 
 * logistica:
 *  compras
 *  pedidos
 *  entregas
 * 
 * tambem tem que tratar de dos fonecedores
 * 
 * o que sistema vai tem que ter:
 * financeiro, estoque, logistica, vendas, outros...
 *  
 *  basico:
 *      cadastro (produto, cliente, funcionario, fornecedor)
 *      login
 *      tela de lista (produtos, clientes, fornecedores)
 * 
 *  logistica:
 *      cadastro de promoções
 *      cadastro do plano de contas
 *      consulta de debitos do dia (pagamentos)
 *      conferencia
 *      metas
 *      pedido de venda
 *      emisão de nota fiscal
 *      manutenção de nota fiscal
 *      nota de compra
 * 
 *  financeiro:
 *      emisão de boleto
 * 
 *  
 * 
 */