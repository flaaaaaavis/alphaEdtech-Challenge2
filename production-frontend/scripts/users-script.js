const apiURL = 'http://localhost:3000/';
const userId = [12]

function ValidaCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
  if (strCPF == "00000000000") return false;

  for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

  Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
}

function validaEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

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
    const email = document.getElementById("email")
    const senha = document.getElementById("senha")

    if (email.value === "" || cpf.value === "" || name.value === "" || senha.value === "") {
        alert("Preencha todos os campos")
        return
    }

    if (!validaEmail(email.value) || !ValidaCPF(cpf.value)) {
        alert("Email ou CPF inválidos")
        return
    }
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