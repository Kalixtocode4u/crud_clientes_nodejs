function myFun(){
    console.log("Olá, Mundo!")
}

let inome = document.querySelector("#inome")
let iemail = document.querySelector("#iemail")
let isenha = document.querySelector("#isenha")
let idocumento = document.querySelector("#idocumento")
let itelefone = document.querySelector("#itelefone")

function deleteCliente(id){
    const api = fetch("localhost:5000/api/cliente?id="+id, {
        method: "DELETE"
    })
    console.log("deletado com sucesso")
}