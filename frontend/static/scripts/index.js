const apiURL = 'http://localhost:3000/'

function openModal (modalId) {
  const mainContent = document.getElementById('container-main-content')
  mainContent.style.display = 'none'
  const modal = document.getElementById(modalId)
  modal.style.display = ''
  modal.style.display = 'flex'
}

function closeModal (modalId) {
  const modal = document.getElementById(modalId)
  modal.style.display = ''
  modal.style.display = 'none'
  const mainContent = document.getElementById('container-main-content')
  mainContent.style.display = ''
  mainContent.style.display = 'flex'
}

function ValidaCPF (strCPF) {
  let Soma
  let Resto
  Soma = 0
  if (strCPF == '00000000000') return false

  for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i)
  Resto = (Soma * 10) % 11

  if ((Resto == 10) || (Resto == 11)) Resto = 0
  if (Resto !== parseInt(strCPF.substring(9, 10))) return false

  Soma = 0
  for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i)
  Resto = (Soma * 10) % 11

  if ((Resto == 10) || (Resto == 11)) Resto = 0
  if (Resto != parseInt(strCPF.substring(10, 11))) return false
  return true
}

function validaEmail (email) {
  const re = /\S+@\S+\.\S+/
  return re.test(email)
}

function login () {
  const email = document.getElementById('email')
  const senha = document.getElementById('password')
  fetch(apiURL + 'login', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email.value,
      password: senha.value
    })
  }).then(response => {
    if (response.status !== 200) {
      alert('Falha no login')
    } else {
      closeModal('container-login')
      document.getElementById('btn-login').style.display = 'none'
      document.getElementById('btn-signin').style.display = 'none'

      document.getElementById('btn-logout').style.display = 'block'
    }
  })
}

function logout () {
  fetch(apiURL + 'logout', {
    method: 'get',
    headers: { 'Content-Type': 'application/json' }
  })
    .then(() => {
      document.getElementById('btn-login').style.display = 'block'
      document.getElementById('btn-signin').style.display = 'block'

      document.getElementById('btn-logout').style.display = 'none'
    })
}

function readUsers () {
  fetch(apiURL + 'readAllUsers', {
    method: 'get',
    headers: { 'Content-Type': 'application/json' }
  }).then(response => {
    response.json().then(users => {
      const listUsuarios = document.getElementById('lista-usuarios')
      users.map(user => {
        const li = document.createElement('li')
        li.innerHTML = `${user.name} - ${user.username} - ${user.cpf}`
        listUsuarios.appendChild(li)
      })
    })
  })
}

function buscar () {
  const buscar = document.getElementById('buscar')
  fetch(`${apiURL}findUser?name=${buscar.value}`, {
    method: 'get',
    headers: { 'Content-Type': 'application/json' }
  }).then(response => {
    console.log(response)
    response.json().then(users => {
      const listUsuarios = document.getElementById('lista-usuarios')
      listUsuarios.innerHTML = ''
      users.map(user => {
        const li = document.createElement('li')
        li.innerHTML = `${user.name} - ${user.username} - ${user.cpf}`
        listUsuarios.appendChild(li)
      })
    })
  })
}

function saveUser () {
  const name = document.getElementById('nome')
  const cpf = document.getElementById('cpf')
  const email = document.getElementById('email')
  const senha = document.getElementById('senha')
  const dtnasc = document.getElementById('dtnasc')
  const ddd = document.getElementById('ddd')
  const phone = document.getElementById('phone')

  if (email.value === '' || cpf.value === '' || name.value === '' || senha.value === '') {
    alert('Preencha todos os campos')
    return
  }

  if (!validaEmail(email.value) || !ValidaCPF(cpf.value)) {
    alert('Email ou CPF inválidos')
    return
  }

  fetch(apiURL + 'createUser', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: name.value,
      cpf: cpf.value,
      email: email.value,
      password: senha.value,
      phone: phone.value,
      ddd: ddd.value,
      birthdate: dtnasc.value
    })
  }).then(response => {
    if (response.status === 201) {
      name.value = ''
      cpf.value = ''
      email.value = ''
      senha.value = ''
      ddd.value = ''
      dtnasc.value = ''
      phone.value = ''
      alert('Usuário salvo com sucesso.')
      // redireciona para o login após cadastro
      window.location = 'login.html'
    }
  })
}

// filterRequests

function allCategories () {
  fetch(apiURL + 'readAllProducts', {
    method: 'get'
  }).then(function (response) {
    if (response.status !== 200) {
      alert('Falha no login')
    } else return response.text()
  }).then(function (data) {
    const res = JSON.parse(data)

    const main = document.getElementById('produtos')

    res.forEach(element => {
      const productId = element.product_id
      // const imageSrc = element.image_src
      const name = element.name
      const value = element.value
      const model = element.model
      const width = element.width
      const height = element.height
      const depth = element.depth

      const divProduct = document.createElement('div')
      divProduct.setAttribute('class', 'product-card')

      const product =
      `
        <img class="product-card-image" src="teste"/>
        <div class="product-card-description">
          <h4 class="product-card-name">${name}</h4>
          <div class="teste">
            <h5 class="product-card-value">${value}</h5>
            <h5 class="product-card-model">${model}</h5>
          </div>
          <div class="teste">
            <p class="product-card-size">
              <span class="product-card-width">${width}</span>
              x
              <span class="product-card-height">${height}</span>
              x
              <span class="product-card-depth">${depth}</span>
            </p>

            <input type="hidden" name="productId" value="${productId}"/>
            <input type="hidden" name="userId" value="10"/>

            <img class="product-card-btn" src="imgs/add_shopping_cart_FILL0_wght400_GRAD0_opsz48.svg" onclick="addItem()"/>
          </div>
        </div>
      `
      divProduct.innerHTML = product
      main.append(divProduct)
    })
  }).catch(err => console.log(err))
}
