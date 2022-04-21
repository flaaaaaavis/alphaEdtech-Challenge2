const apiURL = 'http://localhost:3000/';
const userId = [12]

/**
 * função para chamar o endpoint para listar todos os usuarios
 */
function readUsers(){
    fetch(apiURL+'readAllUsers', {
        method: "get",
        headers: { 'Content-Type': 'application/json' }
    }).then(response => {
        response.json().then(users => {
            const listUsuarios = document.getElementById("lista-usuarios")
            users.map(user => {
                const li = document.createElement("li")
                li.innerHTML = `${user.name} - ${user.username} - ${user.cpf}`
                listUsuarios.appendChild(li)
            })
        })
    });
}

/**
 * função para chamar o endpoint para buscar usuarios
 * a busca vai ser feita por nome ou username ou cpf
 */
function buscar(){
    const buscar = document.getElementById("buscar")
    fetch(`${apiURL}findUser?name=${buscar.value}`, {
        method: "get",
        headers: { 'Content-Type': 'application/json' }
    }).then(response => {
        console.log(response)
        response.json().then(users => {
            const listUsuarios = document.getElementById("lista-usuarios")
            listUsuarios.innerHTML = "";
            users.map(user => {
                const li = document.createElement("li")
                li.innerHTML = `${user.name} - ${user.username} - ${user.cpf}`
                listUsuarios.appendChild(li)
            })
        })
    });
}

/**
 * função para chamar o endpoint para salvar usuarios
 */
function saveUser(){
    const name = document.getElementById("nome")
    const cpf = document.getElementById("cpf")
    const username = document.getElementById("username")
    const senha = document.getElementById("senha")
    fetch(apiURL+'createUser', {
        method: "post",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: name.value,
            cpf: cpf.value,
            user: username.value,
            pass: senha.value
        })
    }).then(response => {
        if (response.status === 201) {
            name.value = ""
            cpf.value = ""
            username.value = ""
            senha.value = ""
            alert("Usuário salvo com sucesso.")
        }
    });
}