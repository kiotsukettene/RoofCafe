document.addEventListener('DOMContentLoaded', function () {
    var cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    var cartItemsTableBody = document.getElementById('cartItemsTableBody');
    var totalPriceModal = document.getElementById('totalPriceModal');

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
                   <td><button class="btn btn-danger" onclick="removeFromCart(${item.id})">Remove</button></td>
                </td>
            </tr>
        `;
        cartItemsTableBody.insertAdjacentHTML('beforeend', itemRow);
    });

    var totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    totalPriceModal.textContent = '₱' + totalPrice.toFixed(2);
});

function removeFromCart(itemId) {
    // Find the index of the item in the cart
    let itemIndex = cartItems.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
      // Remove the item from the cart
      cartItems.splice(itemIndex, 1);
      // Refresh the cart display
      displayCart();
    }
  }

