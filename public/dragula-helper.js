const submitJoin = () => {
    const products = document.querySelector('#col-1').querySelectorAll('li');
    let productStr = '{"products": [';
    for(const [i, product] of products.entries()){
        if(product.getAttribute('data-id') === 'ignore') {
            continue;
        }
        productStr += product.getAttribute('data-id');
        if(i !== products.length - 1){
            productStr += ",";
        }
    }
    productStr += ']}';
    console.log(productStr);
    let hiddenField = document.getElementById('product-submission');
    hiddenField.setAttribute('value', productStr)
    return true;
}

dragula([document.getElementById('col-1'), document.getElementById('col-2')]);

