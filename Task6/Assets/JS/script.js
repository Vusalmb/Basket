let addToCart = document.querySelectorAll(".addCart");



addToCart.forEach(btn => {
    btn.onclick = function(e){
        e.preventDefault();

        if (localStorage.getItem("basket") == null) {
            localStorage.setItem("basket", JSON.stringify([]))
        }

        let basket = JSON.parse(localStorage.getItem("basket"));
        let data_id = this.getAttribute("data-id");
        let name = this.parentElement.children[0].innerHTML;
        let price = this.parentElement.children[2].innerHTML;
        let img = this.parentElement.previousElementSibling.src;

        let product = {ID: data_id, name, price, img, count: 1};
        let existProduct = basket.find(p => p.ID == data_id);

        if(existProduct == undefined){
            basket.push(product);
        }
        else{
            existProduct.count++;
        }
        
        localStorage.setItem("basket", JSON.stringify(basket));

        calcCount();
        totalPrice();
        
        let result = document.getElementById("result");
        let nameResult = document.createElement("p");
        let countResult = document.createElement("span");
        nameResult.innerHTML = product.name;
        countResult.className = "count";
        countResult.innerHTML = 0;
        result.append(nameResult);
        result.append(countResult);
    }
})

function calcCount(){
    let count = document.querySelector(".count");
    let basket = JSON.parse(localStorage.getItem("basket"));

    count.innerHTML = basket.length;
}

calcCount();

function totalPrice(){
    let price = document.querySelector(".price");

    if (localStorage.getItem("basket") == null) {
        localStorage.setItem("basket", JSON.stringify([]));
    }
    
    let basket = JSON.parse(localStorage.getItem("basket"));
    let total = 0;
    basket.forEach(p => {
        total += +p.price * p.count;
    })
    price.innerHTML = total;
}

totalPrice();