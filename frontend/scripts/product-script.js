const apiURL = 'http://localhost:3000/';

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