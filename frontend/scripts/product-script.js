const apiURL = 'http://localhost:3000/';

const cartControl = require('./cart')

function saveProduct() {
    const name = document.getElementById("name")
    const description = document.getElementById("description")
    const model = document.getElementById("model")
    const value = document.getElementById("value")

    fetch(apiURL+'createProduct', {
        method: "post",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: name.value,
            description: description.value,
            model: model.value,
            value: value.value
        })
    }).then(response => {
        if (response.status === 201) {
            name.value = ""
            description.value = ""
            model.value = ""
            value.value = ""
            alert("Produto salvo com sucesso.")
        } else {
            alert("Falha ao cadastrar produto")
        }
    });
}

function openProductInfo() {
    const productId = document.getElementById('productId').value;

    fetch(apiURL+'readProductById', {
        method: "post",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'productId': `'${productId}'`
        })
    }).then(res => {
        if (res.status !== 200) {
            // alert("Falha no login")
        } else {
            window.location.assign('../product.html');
            const body = document.getElementsByTagName('body');

            const { name, value, model, width, height, depth, description } = res.body;
            const imageSrc = res.body.image_src;

            body.innerHTML(`
                <div class="product-card">
                    <form>
                        <img class="product-card-image" src="${imageSrc}">
                        <h4 class="product-card-name">${name}</h4>
                        <h5 class="product-card-value">${value}</h5>
                        <h5 class="product-card-model">${model}</h5>
                        <p class="product-card-size">
                            <span class="product-card-width">${width}</span>
                            x
                            <span class="product-card-height">${height}</span>
                            x
                            <span class="product-card-depth">${depth}</span>
                        </p>
                        <p class="product-card-description">${description}</p>

                        <input type="hidden" name="productId" value="${productId}">
                        <input type="hidden" name="userId" value="10">

                        <img src="imgs/add_shopping_cart_FILL0_wght400_GRAD0_opsz48.svg" onclick="addItem()">
                    </form>
                </div>
            `)
        }
    });
}

function addItem() {
    const productId = document.getElementById('productId').value;
    const userId = document.getElementById('userId').value;

    if(cartControl[userId] === undefined) {
        cartControl[userId] = []
    }
    cartControl[userId].push(productId)
}

function removeItem() {
    const productId = document.getElementById('productId').value;
    const userId = document.getElementById('userId').value;

    for( let i = 0; i < userId.length; i++ ){ 
        if( userId[i] === productId ) {
            userId.splice(i, 1);
            window.location.reload();
        }
    }
}