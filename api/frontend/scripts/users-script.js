const apiURL = 'http://localhost:3000/';

function readUsers(){
    fetch(apiURL+'readAllUsers', {
        method: "get",
        headers: { 'Content-Type': 'application/json' }
    }).then(response => {
        response.json().then(users => {
            const listUsuarios = document.getElementById("lista-usuarios")
            users.map(user => {
                const li = document.createElement("li")
                li.innerHTML = `${user.name} - ${user.cpf}`
                listUsuarios.appendChild(li)
            })
        })
    });
}

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