const apiURL = 'http://localhost:3000/';

async function searchFor() {
    const dataType = document.getElementById('searchBy').value;
    const dataContent = document.getElementById('content').value;
    console.log(dataType, dataContent);
    await fetch(apiURL+'search', {
        method: "post",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            searchType: dataType,
            searchContent: dataContent
        })
    }).then( async res => {
        const response = res;
        const main = document.getElementById('middle')

        for( let i = 0; i < response.length; i++ ){
            const productId = response[i].product_id; 
            const name = response[i].name;
            const value = response[i].value;
            const model = response[i].model;
            const height = response[i].height;
            const width = response[i].width;
            const depth = response[i].depth;

            await fetch(apiURL+'search2', {
                method: "post",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    product_id: productId
                })
            }).then(async res => {
                const imageSrc = res.body.image_src;

                let text = `
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
        
                        <input type="hidden" name="productId" value="${productId}">
                        <input type="hidden" name="userId" value="10">
        
                        <img src="imgs/add_shopping_cart_FILL0_wght400_GRAD0_opsz48.svg" onclick="addItem()">
                    </form>
                </div>
                `;
                main.innerHTML(text);
            })
        }

        if (response.status !== 200) {
            console.log(response)
        } else {
            window.location.assign('../index-logged-in.html');
        }
    });
}