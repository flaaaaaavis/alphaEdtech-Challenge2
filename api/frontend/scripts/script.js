let apiURL = 'http://localhost:3000/';
let esc = 0;

document.getElementById("create").addEventListener('click', () => {
    esc = 1;
})
document.getElementById("update").addEventListener('click', () => {
    esc = 2;
})
document.getElementById("delete").addEventListener('click', () => {
    esc = 3;
})

let form = document.getElementById("form")
form.addEventListener('submit', function(e) {
    e.preventDefault();
  
    let name = form.elements[0].value;
    let cpf = form.elements[1].value;
    let user = form.elements[2].value;
    let pass = form.elements[3].value;
    let admin_ong = document.getElementsByName("account-type")
    let account = ''
    for (var i = 0; i < admin_ong.length; i++) {
        if (admin_ong[i].checked) {
            account = admin_ong[i].value;
        }
    }[0].value;
    console.log(account);
    switch(esc) {
        case 1:
            createAc(name, cpf, user, pass, account);
            break;
        case 2:
            updateAc(name, cpf, user, pass, account);
            break;
        case 3:
            deleteAc(user, pass);
    }  
  })
function updateAc(name, cpf, user, pass, account){
    const options = {
        method: 'PUT',
        body: JSON.stringify({name, cpf, user, pass, account}),
        headers: { 'Content-Type': 'application/json' }
    }

    fetch( apiURL + 'update', options)
    .then(response => {
        if (response.status === 500) {
            return new Error('Error!')
        }
        
        return response.text()
    })
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    })
}
function createAc(name, cpf, user, pass, account){
    
    const options = {
        method: 'POST',
        body: JSON.stringify({name, cpf, user, pass, account}),
        headers: { 'Content-Type': 'application/json' }
    }

    fetch( apiURL + 'createUser/', options)
    .then(response => {
        if (response.status === 500) {
            return new Error('Error!')
        }
        if (response.status === 200) {
            return new Error('Nome de usuário ou cpf ja existente!')
        }
        return response.text()
    })
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    })
}
function deleteAc(user, pass){
    
    const options = {
        method: 'PUT',
        body: JSON.stringify({user, pass}),
        headers: { 'Content-Type': 'application/json' }
    }

    fetch( apiURL + 'delete/', options)
    .then(response => {
        if (response.status === 500) {
            return new Error('Error!')
        }

        return response.text()
    })
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    })
}