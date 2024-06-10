
function addToCart(itemId) {
    var itemName = document.getElementById('itemName' + itemId).innerText;
    var itemPrice = parseFloat(document.getElementById('itemPrice' + itemId).innerText.replace('₱', ''));
    var quantity = 1; 
    var imageSource = document.getElementById('itemImage' + itemId).src;

    var item = {
        id: itemId,
        name: itemName,
        price: itemPrice,
        quantity: quantity,
        image: imageSource
    };

    var cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];

    var existingItemIndex = cartItems.findIndex(function(cartItem) {
        return cartItem.id === itemId;
    });

    if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity += quantity;
    } else {
        cartItems.push(item);
    }

    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
    displayCart();
    
    alert("Item added to cart");
}


function clearCartItems() {
    sessionStorage.removeItem('cartItems');
    alert("Order placed");
    displayCart();
}


function displayCart() {
    var cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    var cartItemsTableBody = document.getElementById('cartItemsTableBody');
    var totalPriceModal = document.getElementById('totalPriceModal');

    cartItemsTableBody.innerHTML = ''; 

    cartItems.forEach(function (item) {
        var itemRow = `
            <tr data-item-id="${item.id}">
                <td class="w-25">
                    <img src="${item.image}" class="img-fluid img-thumbnail" alt="${item.name}">
                </td>
                <td>${item.name}</td>
                <td>₱${item.price.toFixed(2)}</td>
                <td class="qty">${item.quantity}</td>
                <td>₱${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                   <button class="btn btn-danger" onclick="removeFromCart(${item.id})">Remove</button>
                </td>
            </tr>
        `;
        cartItemsTableBody.insertAdjacentHTML('beforeend', itemRow);
    });

    var totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    totalPriceModal.textContent = '₱' + totalPrice.toFixed(2);
}


function removeFromCart(itemId) {
    var cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    var itemIndex = cartItems.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
        cartItems.splice(itemIndex, 1);
        sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
        displayCart();
    }
}



document.addEventListener('DOMContentLoaded', function () {
    displayCart();
});

function checkout() {
 
    var cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];

    if (cartItems.length === 0) {
        alert("Your cart is empty. Please add items before checkout.");
        return;
    }

    let cartDetails = "Cart Items:\n";
    cartItems.forEach(item => {
        cartDetails += `${item.name} - Quantity: ${item.quantity} - Price: ₱${(item.price * item.quantity).toFixed(2)}\n`;
    });

    let totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    cartDetails += `\nTotal Price: ₱${totalPrice.toFixed(2)}`;

    alert("Your Order\n\n" + cartDetails);

  
    clearCartItems();
}
