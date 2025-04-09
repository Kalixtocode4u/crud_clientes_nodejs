# **Projeto mvc node.js backend**
## **Sobre**
Esse é num projeto simples de um Sistema gestão Online Simples


## As tecnologias Usadas
#### Dependencies
|biblioteca|uso|
|:---|----:|
| express | framework express para aplicações backend|
| sequelize | orm (object relational mapping) para o node|
| mariadb | driver do MariaDB|
| ajv | json validador|
| ajv-formats | biblioteca que tem os formatos de regex para validação|
| handlebars | motor de template|
| body-parser | esqueci |
| jsonwebtoken | biblioteca que implementa JSON web tokens|

---

#### Dev-Dependencies
| bilioteca | uso|
|:--|--:|
| sequelize-cli | cli (command line interface) do sequelize|
| nodemon | plugin do node para restartar automaticamente|

---

## Proximos passos
- [ ] Fazer a ciptografia das senhas
- [x] Melhorar a modela do banco de dados
- [x] Digramar o sistema
- [x] handle error
- [ ] corrigir os problemas do middleware
- [ ] implementar o json web tokem no login (Authorization)

## notas

- Os Clientes podem ser uma empresa (ditrubuidoras, fornecedoras) ou um cliente (mercadinho, loja, mercenaria)

- financeiro deve ter os pedidos finalizados, produtos vendidos, registra transação, talvez simular gastos

- deno é mis seguro que o node

## .ENV
Crie o arquivo .env.
coloque as seguintes variaveis:

|NOME|OBRIGATORIO|
|:----|----:|
|ACCESS_TOKEM| NÃO OBRIGATORIO POR ENQUANTO|
|DB_URL|NÃO|


🖋 Kalixtocode4u