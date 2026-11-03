function addToCart(name, price, image) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingItem = cart.find(function(item) {
        return item.name === name;
    });

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(name + " has been added to your cart!");

    window.location.href = "cart.html";
}


function displayCart() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let cartItems = document.getElementById("cart-items");
    let subtotalElement = document.getElementById("cart-subtotal");
    let totalElement = document.getElementById("cart-total");
    let deliveryElement = document.getElementById("delivery-fee");

    if (!cartItems) {
        return;
    }

    cartItems.innerHTML = "";

    let subtotal = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <h3>Your cart is empty 🛒</h3>
                <p>Choose your favourite coffee from our menu.</p>
                <a href="menu.html">Go to Menu</a>
            </div>
        `;

        subtotalElement.innerHTML = "R0";
        deliveryElement.innerHTML = "R0";
        totalElement.innerHTML = "R0";

        return;
    }


    cart.forEach(function(item, index) {

        let itemTotal = item.price * item.quantity;

        subtotal += itemTotal;

        cartItems.innerHTML += `

            <div class="cart-product">

                <img src="${item.image}" alt="${item.name}">

                <div class="product-information">

                    <h3>${item.name}</h3>

                    <p>Freshly prepared by Steamy Coffee.</p>

                    <strong>R${item.price}</strong>

                    <div class="quantity">

                        <button onclick="changeQuantity(${index}, -1)">
                            −
                        </button>

                        <span>${item.quantity}</span>

                        <button onclick="changeQuantity(${index}, 1)">
                            +
                        </button>

                    </div>

                </div>

                <div class="product-total">

                    <strong>R${itemTotal}</strong>

                    <button
                        class="remove-button"
                        onclick="removeItem(${index})">
                        Remove
                    </button>

                </div>

            </div>

        `;

    });


    let delivery = 20;

    let total = subtotal + delivery;

    subtotalElement.innerHTML = "R" + subtotal;

    deliveryElement.innerHTML = "R" + delivery;

    totalElement.innerHTML = "R" + total;

}


function changeQuantity(index, amount) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

}


function removeItem(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

}


function clearCart() {

    localStorage.removeItem("cart");

    displayCart();

}


function checkout() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {

        alert("Your cart is empty. Please add an item first.");

        return;

    }

    alert("Thank you for your order! Checkout is ready.");

}


displayCart();